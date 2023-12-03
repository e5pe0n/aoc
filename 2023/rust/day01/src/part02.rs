use regex::Regex;
use std::{collections::HashMap, fs, iter::zip};

pub fn solve() {
    //     let text = "two1nine
    // eightwothree
    // abcone2threexyz
    // xtwone3four
    // 4nineeightseven2
    // zoneight234
    // 7pqrstsixteen";
    let text = fs::read_to_string("input.txt").unwrap();

    let d = HashMap::from([
        ("one", "1"),
        ("1", "1"),
        ("two", "2"),
        ("2", "2"),
        ("three", "3"),
        ("3", "3"),
        ("four", "4"),
        ("4", "4"),
        ("five", "5"),
        ("5", "5"),
        ("six", "6"),
        ("6", "6"),
        ("seven", "7"),
        ("7", "7"),
        ("eight", "8"),
        ("8", "8"),
        ("nine", "9"),
        ("9", "9"),
    ]);
    let re = Regex::new(
        &("(".to_owned()
            + &(d
                .keys()
                .map(|s| s.to_string())
                .collect::<Vec<_>>()
                .join("|"))
            + ")"),
    )
    .unwrap();

    let rev_d = d
        .clone()
        .into_iter()
        .map(|(k, v)| {
            let rev_k = k
                .split("")
                .collect::<Vec<_>>()
                .into_iter()
                .rev()
                .collect::<Vec<_>>()
                .join("");
            (rev_k, v)
        })
        .collect::<HashMap<_, _>>();
    let rev_re = Regex::new(
        &("(".to_owned()
            + &(rev_d
                .keys()
                .map(|s| s.to_string())
                .collect::<Vec<_>>()
                .join("|"))
            + ")"),
    )
    .unwrap();

    let fsts = text
        .trim()
        .split("\n")
        .map(|s| {
            let caps = re.captures(s).unwrap();
            d.get(&caps[0]).unwrap()
        })
        .collect::<Vec<_>>();

    let lasts = text
        .trim()
        .split("")
        .collect::<Vec<_>>()
        .into_iter()
        .rev()
        .collect::<Vec<_>>()
        .join("")
        .split("\n")
        .map(|s| {
            let caps = rev_re.captures(s).unwrap();
            rev_d.get(&caps[0]).unwrap()
        })
        .collect::<Vec<_>>()
        .into_iter()
        .rev()
        .collect::<Vec<_>>();

    let sum = zip(fsts, lasts)
        .map(|(fst, last)| ((*fst).to_owned() + *last).parse::<i32>().unwrap())
        .fold(0, |acc, v| acc + v);

    println!("{}", sum); // 54530
}
