use std::{
    collections::{HashMap, VecDeque},
    fs,
    u16::MAX,
};

// fn main() {
//     // let content = fs::read_to_string("input_example.txt").unwrap();
//     let content = fs::read_to_string("input.txt").unwrap();
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
//     let mut sum = 0i64;
//     for line in lines {
//         let ss = line.split(' ').collect::<Vec<_>>();
//         let light_str = &ss[0][1..ss[0].len() - 1];
//         let mut light = 0u16;
//         for (i, char) in light_str.chars().rev().enumerate() {
//             if char == '#' {
//                 light |= 1 << i;
//             }
//         }
//         let num_lights = light_str.len() as u16;
//         let buttons = &ss[1..ss.len() - 1]
//             .iter()
//             .map(|s| {
//                 let ns = &s[1..s.len() - 1]
//                     .split(',')
//                     .map(|t| return t.parse::<u16>().unwrap())
//                     .fold(0u16, |acc, v| {
//                         let acc = acc | 1 << (num_lights - 1 - v);
//                         acc
//                     });
//                 return ns.clone();
//             })
//             .collect::<Vec<_>>();

//         let mut g: HashMap<u16, Vec<u16>> = (0..(1 << num_lights)).map(|n| (n, vec![])).collect();

//         for u in 0..(1 << num_lights) {
//             for button in buttons {
//                 g.entry(u).and_modify(|v| v.push(u ^ button));
//             }
//         }

//         let mut q: VecDeque<(u16, u16)> = VecDeque::new();
//         q.push_back((0, 0));
//         let mut dist = 0;
//         while let Some((u, d)) = q.pop_front() {
//             if u == light {
//                 dist = d;
//                 break;
//             }
//             for v in g.get(&u).unwrap() {
//                 q.push_back((*v, d + 1));
//             }
//         }
//         sum += dist as i64;
//     }
//     println!("{sum}"); // 512
// }

fn dfs(xs: &mut Vec<i64>, nss: &Vec<Vec<i64>>, answers: &Vec<i64>) -> Option<i64> {
    if xs.len() == nss[0].len() {
        for i in 0..nss.len() {
            for j in 0..xs.len() {
                if nss[i][j] * xs[j] != answers[i] {
                    return None;
                }
            }
        }
        return Some(xs.iter().sum::<i64>());
    }
    for x in 0..=*answers.iter().max().unwrap() {
        xs.push(x);
        let res = dfs(xs, nss, answers);
        if res.is_some() {
            return res;
        }
        xs.pop();
    }
    return None;
}

fn main() {
    let content = fs::read_to_string("input_example.txt").unwrap();
    // let content = fs::read_to_string("input.txt").unwrap();
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
    let mut sum = 0i64;
    for line in lines {
        let ss = line.split(' ').collect::<Vec<_>>();
        let buttons = &ss[1..ss.len() - 1]
            .iter()
            .map(|s| {
                let ns = &s[1..s.len() - 1]
                    .split(',')
                    .map(|t| return t.parse::<i64>().unwrap())
                    .collect::<Vec<_>>();
                return ns.clone();
            })
            .collect::<Vec<_>>();
        let counters = &ss[ss.len() - 1][1..ss[ss.len() - 1].len() - 1]
            .split(',')
            .map(|s| {
                return s.parse::<i64>().unwrap();
            })
            .collect::<Vec<_>>();
        let buttons = buttons
            .iter()
            .map(|button| {
                let mut v = vec![0i64; counters.len()];
                for b in button {
                    v[*b as usize] = 1;
                }
                v
            })
            .collect::<Vec<_>>();

        println!("{buttons:?} {counters:?}");
        // [[0, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 0], [0, 0, 1, 1], [1, 0, 1, 0], [1, 1, 0, 0]] [3, 5, 4, 7]
        // TODO: transpose buttons
        let mut xs: Vec<i64> = vec![];
        let presses = dfs(&mut xs, &buttons, counters).unwrap();

        sum += presses;
    }
    println!("{sum}");
}
