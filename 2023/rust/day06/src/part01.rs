use regex::Regex;
use std::fs;

pub fn solve() {
    //     let text = "Time:      7  15   30
    // Distance:  9  40  200
    // ";

    let text = fs::read_to_string("input.txt").unwrap();

    let lines = text.trim().split("\n").collect::<Vec<_>>();
    let times = Regex::new(r"\s+")
        .unwrap()
        .split(lines[0])
        .collect::<Vec<_>>()[1..]
        .into_iter()
        .map(|s| s.parse::<i32>().unwrap())
        .collect::<Vec<_>>();
    let dists = Regex::new(r"\s+")
        .unwrap()
        .split(lines[1])
        .collect::<Vec<_>>()[1..]
        .into_iter()
        .map(|s| s.parse::<i32>().unwrap())
        .collect::<Vec<_>>();

    let res = times
        .into_iter()
        .zip(dists)
        .map(|(t, d)| {
            (1..t)
                .map(|holding| {
                    let moving = t - holding;
                    let dist = moving * holding;
                    (dist > d) as i32
                })
                .sum::<i32>()
        })
        .product::<i32>();

    println!("{res}"); // 345015
}
