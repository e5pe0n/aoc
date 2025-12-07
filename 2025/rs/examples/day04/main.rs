use std::fs;

// fn main() {
//     // let content = fs::read_to_string("./input_example.txt").unwrap();
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
//     let m = lines
//         .iter()
//         .map(|line| {
//             return line.chars().collect::<Vec<_>>();
//         })
//         .collect::<Vec<Vec<_>>>();

//     let mut sum = 0;
//     for i in 0..m.len() as i64 {
//         for j in 0..m[0].len() as i64 {
//             if m[i as usize][j as usize] == '.' {
//                 continue;
//             }
//             let mut rolls = 0;
//             for di in -1i64..=1 {
//                 for dj in -1i64..=1 {
//                     if (di, dj) == (0, 0) {
//                         continue;
//                     }
//                     let ni = i + di;
//                     let nj = j + dj;
//                     if 0 <= ni && ni < m.len() as i64 && 0 <= nj && nj < m[0].len() as i64 {
//                         if m[ni as usize][nj as usize] == '@' {
//                             rolls += 1;
//                         }
//                     }
//                 }
//             }
//             if rolls < 4 {
//                 sum += 1;
//             }
//         }
//     }
//     println!("{sum}"); // 1540
// }

fn main() {
    // let content = fs::read_to_string("./input_example.txt").unwrap();
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
    let mut m = lines
        .iter()
        .map(|line| {
            return line.chars().collect::<Vec<_>>();
        })
        .collect::<Vec<Vec<_>>>();

    let mut sum = 0;
    loop {
        let prev_sum = sum;
        for i in 0..m.len() as i64 {
            for j in 0..m[0].len() as i64 {
                if m[i as usize][j as usize] == '.' {
                    continue;
                }
                let mut rolls = 0;
                for di in -1i64..=1 {
                    for dj in -1i64..=1 {
                        if (di, dj) == (0, 0) {
                            continue;
                        }
                        let ni = i + di;
                        let nj = j + dj;
                        if 0 <= ni && ni < m.len() as i64 && 0 <= nj && nj < m[0].len() as i64 {
                            if m[ni as usize][nj as usize] == '@'
                                || m[ni as usize][nj as usize] == 'a'
                            {
                                rolls += 1;
                            }
                        }
                    }
                }
                if rolls < 4 {
                    m[i as usize][j as usize] = 'a';
                    sum += 1;
                }
            }
        }
        for i in 0..m.len() {
            for j in 0..m[0].len() {
                if m[i][j] == 'a' {
                    m[i][j] = '.';
                }
            }
        }
        if prev_sum == sum {
            break;
        }
    }
    println!("{sum}");
}
