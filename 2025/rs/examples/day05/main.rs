use std::{collections::HashSet, fs};

fn main() {
    // let content = fs::read_to_string("./input_example.txt").unwrap();
    let content = fs::read_to_string("./input.txt").unwrap();
    let lines = content
        .split('\n')
        .filter_map(|line| {
            let trimmed = line.trim();
            if trimmed.is_empty() {
                None
            } else {
                Some(trimmed)
            }
        })
        .collect::<Vec<_>>();

    let rs = lines
        .iter()
        .take_while(|line| line.contains('-'))
        .map(|line| {
            let r = line.split('-').collect::<Vec<_>>();
            return (r[0].parse::<i64>().unwrap(), r[1].parse::<i64>().unwrap());
        })
        .collect::<Vec<_>>();
    let ids = lines
        .iter()
        .skip_while(|line| line.contains('-'))
        .map(|line| line.parse::<i64>().unwrap())
        .collect::<Vec<_>>();
    let mut res: HashSet<i64> = HashSet::new();
    for (l, r) in rs {
        for id in &ids {
            if (l..=r).contains(&id) {
                res.insert(*id);
            }
        }
    }
    println!("{}", res.len()); // 563
}
