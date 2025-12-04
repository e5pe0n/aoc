use std::fs;

// fn main() {
//     let content = fs::read_to_string("./input.txt").unwrap();
//     let lines = content
//         .split(',')
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
//         let lr = line.split('-').collect::<Vec<_>>();
//         let l = lr[0].parse::<i64>().unwrap();
//         let r = lr[1].parse::<i64>().unwrap();
//         for i in l..=r {
//             let s = i.to_string();
//             if s.len() % 2 != 0 {
//                 continue;
//             }
//             if &s[..s.len() / 2] == &s[s.len() / 2..] {
//                 sum += i;
//             }
//         }
//     }
//     println!("{}", sum); // 8576933996
// }

fn main() {
    let content = fs::read_to_string("./input.txt").unwrap();
    let lines = content
        .split(',')
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
        let lr = line.split('-').collect::<Vec<_>>();
        let l = lr[0].parse::<i64>().unwrap();
        let r = lr[1].parse::<i64>().unwrap();
        for i in l..=r {
            let s = i.to_string();
            for j in 0..s.len() / 2 {
                if s.len() % (j + 1) != 0 {
                    continue;
                }
                let prefix = &s[..j + 1];
                let t = prefix.repeat(s.len() / (j + 1));
                if s == &t[..] {
                    sum += i;
                    break;
                }
            }
        }
    }
    println!("{}", sum); // 25663320831
}
