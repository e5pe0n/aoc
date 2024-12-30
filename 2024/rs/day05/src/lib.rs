use std::cmp::Ordering;
use std::collections::{HashMap, HashSet};
use std::fs;
use std::path;

struct Rule(i64, i64);

pub fn solve01(filename: &str) -> i64 {
    let fp = path::Path::new(filename);
    let content = fs::read_to_string(fp).unwrap();
    let content = content.trim();
    let ss = content.split("\n\n").collect::<Vec<_>>();
    let rules = ss[0].split("\n").map(|line| {
        let ns = line
            .split("|")
            .map(|s| s.parse::<i64>().unwrap())
            .collect::<Vec<_>>();
        Rule(ns[0], ns[1])
    });
    let rule_map = {
        let mut rule_map: HashMap<i64, HashSet<i64>> = HashMap::new();
        for rule in rules {
            rule_map
                .entry(rule.0)
                .or_insert(HashSet::new())
                .insert(rule.1);
        }
        rule_map
    };
    let updates = ss[1]
        .split("\n")
        .map(|line| {
            line.split(",")
                .map(|s| s.parse::<i64>().unwrap())
                .collect::<Vec<_>>()
        })
        .collect::<Vec<_>>();
    let mut res = 0;
    for update in updates {
        let sorted_update = {
            let mut sorted_update = update.clone();
            sorted_update.sort_by(|a, b| match (rule_map.get(a), rule_map.get(b)) {
                (Some(ns), _) if ns.contains(b) => Ordering::Less,
                (_, Some(ns)) if ns.contains(a) => Ordering::Greater,
                _ => Ordering::Equal,
            });
            sorted_update
        };
        if sorted_update == update {
            res += update[update.len() / 2 as usize];
        }
    }
    res
}

#[cfg(test)]
mod part01_tests {
    use crate::solve01;

    #[test]
    fn example() {
        let result = solve01("input-example.txt");
        assert_eq!(result, 143);
    }

    #[test]
    fn input() {
        let result = solve01("input.txt");
        assert_eq!(result, 7074);
    }
}

pub fn solve02(filename: &str) -> i64 {
    let fp = path::Path::new(filename);
    let content = fs::read_to_string(fp).unwrap();
    let content = content.trim();
    let ss = content.split("\n\n").collect::<Vec<_>>();
    let rules = ss[0].split("\n").map(|line| {
        let ns = line
            .split("|")
            .map(|s| s.parse::<i64>().unwrap())
            .collect::<Vec<_>>();
        Rule(ns[0], ns[1])
    });
    let rule_map = {
        let mut rule_map: HashMap<i64, HashSet<i64>> = HashMap::new();
        for rule in rules {
            rule_map
                .entry(rule.0)
                .or_insert(HashSet::new())
                .insert(rule.1);
        }
        rule_map
    };
    let updates = ss[1]
        .split("\n")
        .map(|line| {
            line.split(",")
                .map(|s| s.parse::<i64>().unwrap())
                .collect::<Vec<_>>()
        })
        .collect::<Vec<_>>();
    let mut res = 0;
    for update in updates {
        let sorted_update = {
            let mut sorted_update = update.clone();
            sorted_update.sort_by(|a, b| match (rule_map.get(a), rule_map.get(b)) {
                (Some(ns), _) if ns.contains(b) => Ordering::Less,
                (_, Some(ns)) if ns.contains(a) => Ordering::Greater,
                _ => Ordering::Equal,
            });
            sorted_update
        };
        if sorted_update != update {
            res += sorted_update[update.len() / 2 as usize];
        }
    }
    res
}

#[cfg(test)]
mod part02_tests {
    use crate::solve02;

    #[test]
    fn example() {
        let result = solve02("input-example.txt");
        assert_eq!(result, 123);
    }

    #[test]
    fn input() {
        let result = solve02("input.txt");
        assert_eq!(result, 4828);
    }
}
