use std::fs;
use std::path;

pub fn solve01(filename: &str) -> i64 {
    let fp = path::Path::new(filename);
    let content = fs::read_to_string(fp).unwrap();
    let content = content.trim();
    let M = content.lines().collect::<Vec<_>>();
    let H = content.lines().count() as i64;
    let W = content.lines().next().unwrap().len() as i64;

    let in_map = |i: i64, j: i64| -> bool { 0 <= i && i < H && 0 <= j && j < W };

    let horizontal = |i: i64, j: i64| -> String {
        if in_map(i, j + 3) {
            M[i as usize][(j as usize)..((j + 4) as usize)].to_string()
        } else {
            "".to_string()
        }
    };
    let vertical = |i: i64, j: i64| -> String {
        let mut t = String::new();
        for k in i..(i + 4) {
            if in_map(k, j) {
                t.push(M[k as usize].chars().nth(j as usize).unwrap());
            }
        }
        t
    };
    let down_right = |i: i64, j: i64| -> String {
        let mut t = String::new();
        for k in 0..4 {
            if in_map(i + k, j + k) {
                t.push(M[(i + k) as usize].chars().nth((j + k) as usize).unwrap());
            }
        }
        t
    };
    let up_right = |i: i64, j: i64| -> String {
        let mut t = String::new();
        for k in 0..4 {
            if in_map(i - k, j + k) {
                t.push(M[(i - k) as usize].chars().nth((j + k) as usize).unwrap());
            }
        }
        t
    };
    let fs: Vec<Box<dyn Fn(i64, i64) -> String>> = vec![
        Box::new(horizontal),
        Box::new(vertical),
        Box::new(down_right),
        Box::new(up_right),
    ];
    let mut res = 0;
    for i in 0..H {
        for j in 0..W {
            for f in fs.iter() {
                let s = f(i, j);
                if s == "XMAS" || s == "SAMX" {
                    res += 1;
                }
            }
        }
    }
    res
}

#[cfg(test)]
mod part01_tests {
    use crate::solve01;

    #[test]
    fn part01_example() {
        let result = solve01("input-example.txt");
        assert_eq!(result, 18);
    }

    #[test]
    fn part01() {
        let result = solve01("input.txt");
        assert_eq!(result, 2427);
    }
}
