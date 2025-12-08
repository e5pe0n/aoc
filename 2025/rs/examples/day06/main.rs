use std::fs;

// fn main() {
//     // let content = fs::read_to_string("./input_example.txt").unwrap();
//     let content = fs::read_to_string("./input.txt").unwrap();
//     let sss = content
//         .split('\n')
//         .filter_map(|line| {
//             let trimmed = line.trim();
//             if trimmed.is_empty() {
//                 None
//             } else {
//                 Some(trimmed)
//             }
//         })
//         .map(|line| {
//             return line
//                 .split(' ')
//                 .filter_map(|s| {
//                     let trimmed = s.trim();
//                     if trimmed.is_empty() {
//                         None
//                     } else {
//                         Some(trimmed)
//                     }
//                 })
//                 .collect::<Vec<_>>();
//         })
//         .collect::<Vec<_>>();
//     let nss = &sss[..sss.len() - 1]
//         .iter()
//         .map(|ss| {
//             ss.iter()
//                 .map(|s| s.parse::<i64>().unwrap())
//                 .collect::<Vec<_>>()
//         })
//         .collect::<Vec<_>>();
//     let ops = &sss[&sss.len() - 1];
//     let mut sum = 0;
//     for j in 0..nss[0].len() {
//         if ops[j] == "+" {
//             let mut t = 0;
//             for i in 0..nss.len() {
//                 t += nss[i][j];
//             }
//             sum += t;
//         } else {
//             let mut t = 1;
//             for i in 0..nss.len() {
//                 t *= nss[i][j];
//             }
//             sum += t;
//         }
//     }
//     println!("{sum}"); // 5552221122013
// }

fn main() {
    // let content = fs::read_to_string("./input_example.txt").unwrap();
    let content = fs::read_to_string("./input.txt").unwrap();
    let charss = content
        .split('\n')
        .filter_map(|line| {
            if line.is_empty() {
                None
            } else {
                Some(line.chars().collect::<Vec<_>>())
            }
        })
        .collect::<Vec<_>>();
    let nss = &charss[..&charss.len() - 1];
    let ops = &charss[&charss.len() - 1]
        .iter()
        .filter(|char| **char != ' ')
        .collect::<Vec<_>>();

    let mut sum = 0;
    let mut ops_iter = ops.iter();
    let mut op = ops_iter.next().unwrap();
    let mut m: i64 = if **op == '+' { 0 } else { 1 };
    for j in 0..nss[0].len() {
        let mut is_space_col = true;
        let mut n: i64 = 0;
        for i in 0..nss.len() {
            if nss[i][j] != ' ' {
                is_space_col = false;
                n = n * 10 + nss[i][j].to_digit(10).unwrap() as i64;
            }
        }
        if is_space_col {
            sum += m;
            op = ops_iter.next().unwrap();
            m = if **op == '+' { 0 } else { 1 };
        } else {
            m = if **op == '+' { m + n } else { m * n };
        }
    }
    sum += m;

    println!("{sum}"); // 11371597126232
}
