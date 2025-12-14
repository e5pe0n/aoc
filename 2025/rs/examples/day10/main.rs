use core::num;
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

fn combinations(vs: &Vec<usize>, r: usize) -> Vec<Vec<usize>> {
    let pool = vs.clone();
    let n = pool.len();
    if r > n {
        return Vec::new();
    }
    let mut indices = Vec::from_iter(0..r);
    let mut res: Vec<Vec<usize>> = vec![
        indices
            .iter()
            .map(|index| {
                return pool[*index];
            })
            .collect(),
    ];
    loop {
        for i in (0..r).rev() {
            if indices[i] != i + n - r {
                indices[i] += 1;
                for j in (i + 1)..r {
                    indices[j] = indices[j - 1] + 1;
                }
                res.push(indices.clone());
            }
            return res;
        }
    }
}

// fn get_press_patterns(buttons: &Vec<Vec<i64>>) -> HashMap<Vec<i64>, HashMap<Vec<i64>, i64>> {
//     let mut press_patterns: HashMap<Vec<i64>, HashMap<Vec<i64>, i64>> = HashMap::new();
//     for num_pressed_buttons in 0..(buttons.len() + 1) {
//         for button_combs in combinations((0..buttons.len()).into(), num_pressed_buttons) {
//             let pattern = vec![0; buttons[0].len()];
//             for i in 0..buttons[0].len() {
//                 for b in 0..button_combs.len() {
//                     if buttons[b][i] > 0 {
//                         pattern[i] += 1;
//                     }
//                 }
//             }
//             let parity_pattern = pattern
//                 .iter()
//                 .map(|p| {
//                     return p % 2;
//                 })
//                 .collect::<Vec<_>>();
//             press_patterns.entry(&parity_pattern).and_modify(|e| {
//                 *e.entry(&pattern).insert_entry(num_pressed_buttons);
//             });
//         }
//     }
//     return press_patterns;
// }

// fn dns(buttons: &mut Vec<Vec<i64>>, joltages: &Vec<i64>) -> i64 {}

// https://www.reddit.com/r/adventofcode/comments/1pk87hl/2025_day_10_part_2_bifurcate_your_way_to_victory/
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
    // for line in lines {
    //     let ss = line.split(' ').collect::<Vec<_>>();
    //     let buttons = &ss[1..ss.len() - 1]
    //         .iter()
    //         .map(|s| {
    //             let ns = &s[1..s.len() - 1]
    //                 .split(',')
    //                 .map(|t| return t.parse::<i64>().unwrap())
    //                 .collect::<Vec<_>>();
    //             return ns.clone();
    //         })
    //         .collect::<Vec<_>>();
    //     let joltages = &ss[ss.len() - 1][1..ss[ss.len() - 1].len() - 1]
    //         .split(',')
    //         .map(|s| {
    //             return s.parse::<i64>().unwrap();
    //         })
    //         .collect::<Vec<_>>();
    //     let buttons = buttons
    //         .iter()
    //         .map(|button| {
    //             let mut v = vec![0i64; counters.len()];
    //             for b in button {
    //                 v[*b as usize] = 1;
    //             }
    //             v
    //         })
    //         .collect::<Vec<_>>();

    //     let mut xs: Vec<i64> = vec![];
    //     let presses = dfs(&mut xs, &buttons, counters).unwrap();

    //     sum += presses;
    // }
    println!("{sum}");
}
