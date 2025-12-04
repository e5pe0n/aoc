use std::fs;

fn main() {
    let content = fs::read_to_string("./input.txt").unwrap();
    let lines = content
        .split('\n')
        .filter(|line| !line.is_empty())
        .collect::<Vec<_>>();
    let mut sum = 50;
    let mut password = 0;
    for line in lines {
        let chars = line.chars().collect::<Vec<_>>();
        let lr = &chars[0];
        let n = (&chars[1..].iter().collect::<String>())
            .parse::<i64>()
            .unwrap();
        if lr == &'L' {
            sum = (sum - n + 100) % 100;
        } else {
            sum = (sum + n) % 100;
        }
        if sum == 0 {
            password += 1;
        }
    }
    println!("{}", password);
}
