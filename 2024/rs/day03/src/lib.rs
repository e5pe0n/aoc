use regex::Regex;
use std::fs;
use std::path;

pub fn solve01(filename: &str) -> i64 {
    let fp = path::Path::new(filename);
    let content = fs::read_to_string(fp).unwrap();
    let content = content.trim();

    let re = Regex::new(r"mul\((\d+),(\d+)\)").unwrap();
    re.captures_iter(content)
        .map(|c| c.extract())
        .map(|(_, [a, b])| a.parse::<i64>().unwrap() * b.parse::<i64>().unwrap())
        .sum()
}

#[cfg(test)]
mod part01_tests {
    use crate::solve01;

    #[test]
    fn part01_example() {
        let result = solve01("input-example.txt");
        assert_eq!(result, 161);
    }

    #[test]
    fn part01() {
        let result = solve01("input.txt");
        assert_eq!(result, 188116424);
    }
}

pub fn solve02(filename: &str) -> i64 {
    let fp = path::Path::new(filename);
    let content = fs::read_to_string(fp).unwrap();
    let content = content.trim();

    let re = Regex::new(r"(mul\(\d+,\d+\)|do\(\)|don't\(\))").unwrap();
    let mul_re = Regex::new(r"mul\((\d+),(\d+)").unwrap();
    let mut enabled = true;
    let mut res = 0;
    for s in re.find_iter(content).map(|m| m.as_str()) {
        match s {
            "do()" => enabled = true,
            "don't()" => enabled = false,
            _ => {
                if enabled {
                    let (_, [a, b]) = mul_re.captures(s).unwrap().extract();
                    res += a.parse::<i64>().unwrap() * b.parse::<i64>().unwrap();
                }
            }
        }
    }
    res
}

#[cfg(test)]
mod part02_tests {
    use crate::solve02;

    #[test]
    fn part02_example() {
        let result = solve02("input-example-02.txt");
        assert_eq!(result, 48);
    }

    #[test]
    fn part02() {
        let result = solve02("input.txt");
        assert_eq!(result, 104245808);
    }
}
