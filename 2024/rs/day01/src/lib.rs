use regex::Regex;
use std::collections::HashMap;
use std::fs;
use std::path::Path;

pub fn solve01(filename: &str) -> i64 {
    let fp = Path::new(filename);
    let s = fs::read_to_string(fp).unwrap();
    let re = Regex::new(r"\s+").unwrap();
    let mut left: Vec<i64> = vec![];
    let mut right: Vec<i64> = vec![];
    for line in s.lines() {
        let v = re.split(line).collect::<Vec<_>>();
        left.push(v[0].to_string().parse::<i64>().unwrap());
        right.push(v[1].to_string().parse::<i64>().unwrap());
    }
    left.sort();
    right.sort();
    let sum = left
        .iter()
        .zip(right.iter())
        .map(|(l, r)| (l - r).abs())
        .sum();
    return sum;
}

#[cfg(test)]
mod part01 {
    use crate::solve01;

    #[test]
    fn part01_example() {
        let result = solve01("input-example.txt");
        assert_eq!(result, 11);
    }

    #[test]
    fn part01() {
        let result = solve01("input.txt");
        assert_eq!(result, 1834060);
    }
}

pub fn solve02(filename: &str) -> i64 {
    let fp = Path::new(filename);
    let s = fs::read_to_string(fp).unwrap();
    let re = Regex::new(r"\s+").unwrap();
    let mut left: Vec<i64> = vec![];
    let mut right: Vec<i64> = vec![];
    for line in s.lines() {
        let v = re.split(line).collect::<Vec<_>>();
        left.push(v[0].to_string().parse::<i64>().unwrap());
        right.push(v[1].to_string().parse::<i64>().unwrap());
    }

    let mut right_map: HashMap<i64, i64> = HashMap::new();
    for r in right.iter() {
        let v = right_map.entry(*r).or_insert(0);
        *v += 1;
    }
    let mut sum = 0;
    for l in left.iter() {
        sum += right_map.get(l).unwrap_or(&0) * l;
    }
    return sum;
}

#[cfg(test)]
mod part02 {
    use crate::solve02;

    #[test]
    fn part02_example() {
        let result = solve02("input-example.txt");
        assert_eq!(result, 31);
    }

    #[test]
    fn part02() {
        let result = solve02("input.txt");
        assert_eq!(result, 21607792);
    }
}
