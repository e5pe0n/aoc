use std::fs;
use std::path;

pub fn solve01(filename: &str) -> i64 {
    let contents = fs::read_to_string(path::Path::new(filename)).unwrap();
    let contents = contents.trim();
    let ss = contents.split("\n\n").collect::<Vec<_>>();
    let towels = ss[0].split(", ").collect::<Vec<_>>();
    let designs = ss[1].split("\n").collect::<Vec<_>>();
    let mut res = 0;
    for design in &designs {
        let mut dp: Vec<i64> = vec![0; design.len() + 1];
        dp[0] = 1;
        for i in 0..design.len() {
            for towel in &towels {
                if i + towel.len() <= design.len() && &design[i..i + towel.len()] == *towel {
                    dp[i + towel.len()] += dp[i];
                }
            }
        }
        res += if dp[design.len()] > 0 { 1 } else { 0 };
    }
    res
}

#[cfg(test)]
mod part01_tests {
    use crate::solve01;

    #[test]
    fn example() {
        let result = solve01("input-example.txt");
        assert_eq!(result, 6);
    }

    #[test]
    fn input() {
        let result = solve01("input.txt");
        assert_eq!(result, 287);
    }
}

pub fn solve02(filename: &str) -> i64 {
    let contents = fs::read_to_string(path::Path::new(filename)).unwrap();
    let contents = contents.trim();
    let ss = contents.split("\n\n").collect::<Vec<_>>();
    let towels = ss[0].split(", ").collect::<Vec<_>>();
    let designs = ss[1].split("\n").collect::<Vec<_>>();
    let mut res = 0;
    for design in &designs {
        let mut dp = vec![0; design.len() + 1];
        dp[0] = 1;
        for i in 0..design.len() {
            for towel in &towels {
                if i + towel.len() <= design.len() && &design[i..i + towel.len()] == *towel {
                    dp[i + towel.len()] += dp[i];
                }
            }
        }
        res += dp[design.len()];
    }
    res
}

#[cfg(test)]
mod part02_tests {
    use crate::solve02;

    #[test]
    fn example() {
        let result = solve02("input-example.txt");
        assert_eq!(result, 16);
    }

    #[test]
    fn input() {
        let result = solve02("input.txt");
        assert_eq!(result, 571894474468161);
    }
}
