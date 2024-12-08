use std::fs;
use std::path;

pub fn solve01(filename: &str) -> i64 {
    let fp = path::Path::new(filename);
    let content = fs::read_to_string(fp).unwrap();
    let reports = content
        .split("\n")
        .filter(|line| line.len() > 0)
        .map(|line| {
            line.split(" ")
                .map(|x| x.parse::<i64>().unwrap())
                .collect::<Vec<_>>()
        })
        .collect::<Vec<_>>();
    let diffss = reports
        .iter()
        .map(|report| {
            report
                .windows(2)
                .map(|w| match w {
                    [x, y] => x - y,
                    _ => panic!("unexpected window size"),
                })
                .collect::<Vec<_>>()
        })
        .collect::<Vec<_>>();
    diffss
        .iter()
        .map(|diffs| {
            diffs.iter().map(|v| v.abs()).all(|v| 0 < v && v <= 3)
                && diffs
                    .windows(2)
                    .map(|w| match w {
                        [x, y] => x * y > 0,
                        _ => false,
                    })
                    .all(|v| v)
        })
        .map(|v| v as i64)
        .sum()
}

#[cfg(test)]
mod part01 {
    use crate::solve01;

    #[test]
    fn part01_example() {
        let result = solve01("input-example.txt");
        assert_eq!(result, 2);
    }

    #[test]
    fn part01() {
        let result = solve01("input.txt");
        assert_eq!(result, 502);
    }
}
