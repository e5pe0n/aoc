use std::fs;

fn main() {
    // let content = fs::read_to_string("./input_example.txt").unwrap();
    let content = fs::read_to_string("./input.txt").unwrap();
    let sss = content
        .split('\n')
        .filter_map(|line| {
            let trimmed = line.trim();
            if trimmed.is_empty() {
                None
            } else {
                Some(trimmed)
            }
        })
        .map(|line| {
            return line
                .split(' ')
                .filter_map(|s| {
                    let trimmed = s.trim();
                    if trimmed.is_empty() {
                        None
                    } else {
                        Some(trimmed)
                    }
                })
                .collect::<Vec<_>>();
        })
        .collect::<Vec<_>>();
    let nss = &sss[..sss.len() - 1]
        .iter()
        .map(|ss| {
            ss.iter()
                .map(|s| s.parse::<i64>().unwrap())
                .collect::<Vec<_>>()
        })
        .collect::<Vec<_>>();
    let ops = &sss[&sss.len() - 1];
    let mut sum = 0;
    for j in 0..nss[0].len() {
        if ops[j] == "+" {
            let mut t = 0;
            for i in 0..nss.len() {
                t += nss[i][j];
            }
            sum += t;
        } else {
            let mut t = 1;
            for i in 0..nss.len() {
                t *= nss[i][j];
            }
            sum += t;
        }
    }
    println!("{sum}"); // 5552221122013
}
