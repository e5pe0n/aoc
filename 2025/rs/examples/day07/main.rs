use std::fs;

// fn main() {
//     // let content = fs::read_to_string("./input_example.txt").unwrap();
//     let content = fs::read_to_string("./input.txt").unwrap();
//     let mut charss = content
//         .split('\n')
//         .filter_map(|line| {
//             let trimmed = line.trim();
//             if trimmed.is_empty() {
//                 None
//             } else {
//                 Some(trimmed.chars().collect::<Vec<_>>())
//             }
//         })
//         .collect::<Vec<_>>();
//     let sj = charss[0].iter().position(|char| *char == 'S').unwrap();
//     charss[0][sj] = '|';
//     let mut sum = 0;
//     for i in 1..charss.len() {
//         for j in 0..charss[i].len() {
//             if charss[i - 1][j] == '|' {
//                 if charss[i][j] == '^' {
//                     charss[i][j - 1] = '|';
//                     charss[i][j + 1] = '|';
//                     sum += 1;
//                 } else if charss[i][j] == '.' {
//                     charss[i][j] = '|';
//                 }
//             }
//         }
//     }
//     println!("{sum}"); // 1533
// }

fn main() {
    // let content = fs::read_to_string("./input_example.txt").unwrap();
    let content = fs::read_to_string("./input.txt").unwrap();
    let mut charss = content
        .split('\n')
        .filter_map(|line| {
            let trimmed = line.trim();
            if trimmed.is_empty() {
                None
            } else {
                Some(trimmed.chars().collect::<Vec<_>>())
            }
        })
        .collect::<Vec<_>>();
    let sj = charss[0].iter().position(|char| *char == 'S').unwrap();
    charss[0][sj] = '|';
    let mut dp = vec![vec![0i64; charss[0].len()]; charss.len()];
    dp[0][sj] = 1;
    for i in 1..charss.len() {
        for j in 0..charss[i].len() {
            if charss[i][j] == '.' {
                if charss[i - 1][j] == '|' {
                    dp[i][j] += dp[i - 1][j];
                    charss[i][j] = '|';
                }
                if j.checked_sub(1).is_some()
                    && (0..charss[i].len()).contains(&(j - 1))
                    && charss[i][j - 1] == '^'
                    && charss[i - 1][j - 1] == '|'
                {
                    dp[i][j] += dp[i - 1][j - 1];
                    charss[i][j] = '|';
                }
                if (0..charss[i].len()).contains(&(j + 1))
                    && charss[i][j + 1] == '^'
                    && charss[i - 1][j + 1] == '|'
                {
                    dp[i][j] += dp[i - 1][j + 1];
                    charss[i][j] = '|';
                }
            }
        }
    }
    let sum = dp[dp.len() - 1].iter().sum::<i64>();
    println!("{sum}"); // 10733529153890
}
