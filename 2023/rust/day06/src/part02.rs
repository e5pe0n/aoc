use regex::Regex;
use std::fs;

pub fn solve() {
    //     let text = "Time:      7  15   30
    // Distance:  9  40  200
    // ";
    let text = fs::read_to_string("input.txt").unwrap();

    let lines = text.trim().split("\n").collect::<Vec<_>>();
    let time = Regex::new(r"\s+")
        .unwrap()
        .split(lines[0])
        .collect::<Vec<_>>()[1..]
        .join("")
        .parse::<i64>()
        .unwrap();
    let dist = Regex::new(r"\s+")
        .unwrap()
        .split(lines[1])
        .collect::<Vec<_>>()[1..]
        .join("")
        .parse::<i64>()
        .unwrap();

    let dlt = time * time - 4 * dist;
    if dlt < 0 {
        println!("0");
        return;
    }

    let xl = 0.5 * ((time as f64) - (dlt as f64).powf(0.5));
    let holding_l = xl.ceil() as i64;

    let xr = 0.5 * ((time as f64) + (dlt as f64).powf(0.5));
    let holding_r = xr.floor() as i64;

    println!("{}", holding_r - holding_l + 1); // 42588603
}
