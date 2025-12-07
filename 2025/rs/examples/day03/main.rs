use std::{cmp::max, fs};

// fn main() {
//     let content = fs::read_to_string("./input.txt").unwrap();
//     let lines = content
//         .split('\n')
//         .filter_map(|line| {
//             let trimmed = line.trim();
//             if trimmed.is_empty() {
//                 None
//             } else {
//                 Some(trimmed)
//             }
//         })
//         .collect::<Vec<_>>();

//     let mut sum = 0;
//     for line in lines {
//         let mut m = 0;
//         let chars = line.chars().collect::<Vec<_>>();
//         for i in 0..chars.len() {
//             for j in i + 1..chars.len() {
//                 let n = (chars[i].to_string() + &chars[j].to_string())
//                     .parse::<i64>()
//                     .unwrap();
//                 m = max(m, n);
//             }
//         }
//         sum += m;
//     }
//     println!("{sum}");   // 17193
// }

fn main() {
    let content = fs::read_to_string("./input.txt").unwrap();
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

    let mut sum = 0;
    for line in lines {
        let chars = line.chars().collect::<Vec<_>>();
        let mut dp: Vec<Vec<i64>> = vec![vec![0; chars.len()]; chars.len()];
        for (i, char) in chars.iter().enumerate() {
            dp[0][i] = char.to_digit(10).unwrap() as i64;
        }
        for i in 1..12 {
            for j in 0..chars.len() {
                for k in 0..j {
                    let n = dp[i - 1][k] * 10 + chars[j].to_digit(10).unwrap() as i64;
                    if n > dp[i][j] {
                        dp[i][j] = n;
                    }
                }
            }
        }
        let m = dp[11].iter().max().unwrap();
        sum += m;
    }
    println!("{sum}"); // 171297349921310
}
