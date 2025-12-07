use std::{cmp::max, fs};

fn main() {
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

    let mut sum = 0;
    for line in lines {
        let mut m = 0;
        let chars = line.chars().collect::<Vec<_>>();
        for i in 0..chars.len() {
            for j in i + 1..chars.len() {
                let n = (chars[i].to_string() + &chars[j].to_string())
                    .parse::<i64>()
                    .unwrap();
                m = max(m, n);
            }
        }
        sum += m;
    }
    println!("{sum}");
}
