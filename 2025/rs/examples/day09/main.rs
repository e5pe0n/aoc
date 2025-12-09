use std::cmp::{max, min};
use std::fs;

fn main() {
    // let content = fs::read_to_string("input_example.txt").unwrap();
    let content = fs::read_to_string("input.txt").unwrap();
    let lines = content
        .split('\n')
        .filter_map(|line| {
            let trimmed = line.trim();
            if trimmed.is_empty() {
                None
            } else {
                Some({
                    let v = trimmed
                        .split(',')
                        .map(|s| s.parse::<i64>().unwrap())
                        .collect::<Vec<_>>();
                    (v[0], v[1])
                })
            }
        })
        .collect::<Vec<_>>();
    let mut res = 0;
    for i in 0..lines.len() - 1 {
        for j in i + 1..lines.len() {
            res = max(
                res,
                (max(lines[i].0, lines[j].0) - min(lines[i].0, lines[j].0) + 1)
                    * (max(lines[i].1, lines[j].1) - min(lines[i].1, lines[j].1) + 1),
            )
        }
    }
    println!("{res}"); // 4735268538
}
