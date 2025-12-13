use std::{
    collections::{HashMap, VecDeque},
    fs,
};

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
                Some(trimmed)
            }
        })
        .collect::<Vec<_>>();
    let g: HashMap<String, Vec<String>> = lines
        .iter()
        .map(|line| {
            let line = line
                .split(' ')
                .map(|s| s.trim().to_string())
                .collect::<Vec<_>>();
            (
                line[0][..line[0].len() - 1].to_string(),
                line[1..].iter().cloned().collect::<Vec<String>>(),
            )
        })
        .collect();
    let mut sum = 0;
    let mut q = VecDeque::new();
    q.push_back("you");
    while let Some(u) = q.pop_front() {
        if u == "out" {
            sum += 1;
            continue;
        }
        if let Some(vs) = g.get(u) {
            for v in vs {
                q.push_back(v);
            }
        }
    }
    println!("{sum}"); // 699
}
