use regex::Regex;
use std::{collections::HashMap, fs};

pub fn solve() {
    //     let text = "RL

    // AAA = (BBB, CCC)
    // BBB = (DDD, EEE)
    // CCC = (ZZZ, GGG)
    // DDD = (DDD, DDD)
    // EEE = (EEE, EEE)
    // GGG = (GGG, GGG)
    // ZZZ = (ZZZ, ZZZ)
    // ";

    //     let text = "LLR

    // AAA = (BBB, BBB)
    // BBB = (AAA, ZZZ)
    // ZZZ = (ZZZ, ZZZ)
    // ";

    let text = fs::read_to_string("input.txt").unwrap();

    let lines = text.trim().split("\n").collect::<Vec<_>>();
    let lrs = lines[0].chars().collect::<Vec<_>>();

    let mut graph = HashMap::<String, [String; 2]>::new();
    let re = Regex::new(r"(?<u>\w+)\s+=\s+\((?<v1>\w+),\s+(?<v2>\w+)\)").unwrap();
    for line in &lines[2..] {
        let Some(caps) = re.captures(line) else {
            continue;
        };
        graph.insert(
            caps["u"].to_string(),
            [caps["v1"].to_string(), caps["v2"].to_string()],
        );
    }

    let mut u = String::from("AAA");
    let mut cnt = 0;
    '_loop: loop {
        for lr in lrs.iter() {
            if let Some([v1, v2]) = graph.get(&u) {
                u = if lr == &'L' {
                    v1.to_string()
                } else {
                    v2.to_string()
                };
                cnt += 1;
                if u == String::from("ZZZ") {
                    println!("{cnt}"); // 16409
                    break '_loop;
                }
            };
        }
    }
}
