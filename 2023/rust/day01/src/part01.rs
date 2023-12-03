use std::fs;

pub fn solve() {
    //     let text = "1abc2
    // pqr3stu8vwx
    // a1b2c3d4e5f
    // treb7uchet";
    let text = fs::read_to_string("input.txt").unwrap();

    let sum = text
        .trim()
        .split('\n')
        .map(|s| {
            let v = s.matches(char::is_numeric).collect::<Vec<&str>>();
            (String::from(v[0]) + v[v.len() - 1])
                .parse::<i32>()
                .unwrap()
        })
        .fold(0, |acc, v| acc + v);

    println!("{}", sum); // 56049
}
