use regex::Regex;
use std::{collections::HashSet, fs};

pub fn solve() {
    //     let text = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    // Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
    // Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
    // Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
    // Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
    // Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
    // ";
    let text = fs::read_to_string("input.txt").unwrap();

    let lines = text.trim().split("\n").collect::<Vec<_>>();

    let sum = lines
        .into_iter()
        .map(|line| {
            let ss = Regex::new(r":\s+").unwrap().split(line).collect::<Vec<_>>();
            let wins_yourss_s = Regex::new(r"\s+\|\s+")
                .unwrap()
                .split(ss[1])
                .collect::<Vec<_>>();

            let wins = HashSet::<i32>::from_iter(
                Regex::new(r"\s+")
                    .unwrap()
                    .split(wins_yourss_s[0])
                    .map(|s| s.parse::<i32>().unwrap())
                    .into_iter(),
            );
            let yourss = Regex::new(r"\s+")
                .unwrap()
                .split(wins_yourss_s[1])
                .map(|s| s.parse::<i32>().unwrap())
                .collect::<Vec<_>>();
            let cnt = yourss
                .into_iter()
                .fold(0, |acc, v| acc + (if wins.contains(&v) { 1 } else { 0 }));

            if cnt > 0 {
                1 << (cnt - 1)
            } else {
                0
            }
        })
        .sum::<i32>();
    println!("{sum}"); // 19855
}
