use std::{collections::HashMap, fs};

fn find(par: &mut Vec<usize>, x: usize) -> usize {
    if x == par[x] {
        x
    } else {
        par[x] = find(par, par[x]);
        par[x]
    }
}

fn unite(par: &mut Vec<usize>, rnk: &mut Vec<usize>, x: usize, y: usize) {
    let x = find(par, x);
    let y = find(par, y);
    if x == y {
        return;
    }
    if rnk[x] < rnk[y] {
        par[x] = y;
    } else {
        par[y] = x;
        if rnk[x] == rnk[y] {
            rnk[x] += 1;
        }
    }
}

fn same(par: &mut Vec<usize>, x: usize, y: usize) -> bool {
    find(par, x) == find(par, y)
}

type Coord = (i64, i64, i64);

fn distance((x1, y1, z1): &Coord, (x2, y2, z2): &Coord) -> i64 {
    (x1 - x2).pow(2) + (y1 - y2).pow(2) + (z1 - z2).pow(2)
}

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
//                 Some({
//                     let v = trimmed
//                         .split(',')
//                         .map(|s| s.parse::<i64>().unwrap())
//                         .collect::<Vec<_>>();
//                     (v[0], v[1], v[2])
//                 })
//             }
//         })
//         .collect::<Vec<_>>();

//     let mut par = (0..lines.len()).collect::<Vec<_>>();
//     let mut rnk = vec![0usize; lines.len()];
//     let mut dist = vec![];
//     for i in 0..lines.len() - 1 {
//         for j in i + 1..lines.len() {
//             dist.push((i, j, distance(&lines[i], &lines[j])));
//         }
//     }
//     dist.sort_by(|a, b| a.2.cmp(&b.2));
//     // for (i, j, _) in dist.iter().take(10) {
//     for (i, j, _) in dist.iter().take(1000) {
//         unite(&mut par, &mut rnk, *i, *j);
//     }
//     let mut counter: HashMap<usize, i64> = HashMap::new();
//     for p in par.clone().iter() {
//         *counter.entry(find(&mut par, *p)).or_insert(0) += 1;
//     }
//     let mut vs = counter.iter().map(|(_, v)| *v).collect::<Vec<_>>();
//     vs.sort_by(|a, b| b.cmp(&a));
//     let res = vs.iter().take(3).fold(1, |acc, v| acc * v);
//     println!("{res}"); // 72150
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
                Some({
                    let v = trimmed
                        .split(',')
                        .map(|s| s.parse::<i64>().unwrap())
                        .collect::<Vec<_>>();
                    (v[0], v[1], v[2])
                })
            }
        })
        .collect::<Vec<_>>();

    let mut par = (0..lines.len()).collect::<Vec<_>>();
    let mut rnk = vec![0usize; lines.len()];
    let mut dist = vec![];
    for i in 0..lines.len() - 1 {
        for j in i + 1..lines.len() {
            dist.push((i, j, distance(&lines[i], &lines[j])));
        }
    }
    dist.sort_by(|a, b| a.2.cmp(&b.2));
    let (mut last_x1, mut last_x2) = (0, 0);
    for (i, j, _) in dist.iter() {
        if !same(&mut par, *i, *j) {
            (last_x1, last_x2) = (lines[*i].0, lines[*j].0);
            unite(&mut par, &mut rnk, *i, *j);
        }
    }
    let res = last_x1 * last_x2;
    println!("{res}"); // 3926518899
}
