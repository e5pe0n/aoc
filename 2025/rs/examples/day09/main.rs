use std::cmp::{max, min};
use std::collections::{HashMap, HashSet};
use std::fs;

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
//                 Some({
//                     let v = trimmed
//                         .split(',')
//                         .map(|s| s.parse::<i64>().unwrap())
//                         .collect::<Vec<_>>();
//                     (v[0], v[1])
//                 })
//             }
//         })
//         .collect::<Vec<_>>();
//     let mut res = 0;
//     for i in 0..lines.len() - 1 {
//         for j in i + 1..lines.len() {
//             res = max(
//                 res,
//                 (max(lines[i].0, lines[j].0) - min(lines[i].0, lines[j].0) + 1)
//                     * (max(lines[i].1, lines[j].1) - min(lines[i].1, lines[j].1) + 1),
//             )
//         }
//     }
//     println!("{res}"); // 4735268538
// }

// https://github.com/mmakaay/adventofcode2025/blob/main/09_Movie_Theater/part2.py
fn main() {
    // let content = fs::read_to_string("input_example.txt").unwrap();
    let content = fs::read_to_string("input.txt").unwrap();
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
                        .map(|s| s.parse::<usize>().unwrap())
                        .collect::<Vec<_>>();
                    (v[0], v[1])
                })
            }
        })
        .collect::<Vec<_>>();

    let red_tiles: HashSet<_> = lines.iter().cloned().collect();
    let mut green_tiles: HashSet<(usize, usize)> = HashSet::new();
    for i in 0..lines.len() {
        let (from_x, from_y) = lines[i];
        let (to_x, to_y) = lines[(i + 1) % lines.len()];
        if from_x == to_x {
            green_tiles.extend((min(from_y, to_y)..max(from_y, to_y)).map(|y| (from_x, y)));
        } else {
            green_tiles.extend((min(from_x, to_x)..max(from_x, to_x)).map(|x| (x, from_y)));
        }
    }
    let all_edge_tiles = red_tiles
        .iter()
        .chain(green_tiles.iter())
        .cloned()
        .collect::<HashSet<(usize, usize)>>();

    let mut squeezed_xs = lines
        .iter()
        .cloned()
        .map(|(x, _)| x)
        .collect::<HashSet<_>>()
        .into_iter()
        .collect::<Vec<_>>();
    let mut squeezed_ys = lines
        .iter()
        .cloned()
        .map(|(_, y)| y)
        .collect::<HashSet<_>>()
        .into_iter()
        .collect::<Vec<_>>();
    squeezed_xs.sort();
    squeezed_ys.sort();
    let squeezed_x_indices = squeezed_xs
        .iter()
        .cloned()
        .enumerate()
        .map(|(i, x)| (x, i))
        .collect::<HashMap<_, _>>();
    let squeezed_y_indices = squeezed_ys
        .iter()
        .cloned()
        .enumerate()
        .map(|(j, y)| (y, j))
        .collect::<HashMap<_, _>>();

    let mut vertical_edges_by_y: HashMap<usize, Vec<usize>> = HashMap::new();
    for i in 0..lines.len() {
        let (x1, y1) = lines[i];
        let (x2, y2) = lines[(i + 1) % lines.len()];
        if x1 == x2 {
            let (from_y, to_y) = (min(y1, y2), max(y1, y2));
            for y in &squeezed_ys {
                if from_y < *y && *y <= to_y {
                    vertical_edges_by_y.entry(*y).or_default().push(x1);
                }
            }
        }
    }

    let mut insides = vec![vec![false; squeezed_xs.len()]; squeezed_ys.len()];
    for (i, y) in squeezed_ys.iter().enumerate() {
        for (j, x) in squeezed_xs.iter().enumerate() {
            if all_edge_tiles.contains(&(*x, *y)) {
                insides[i][j] = true;
            } else {
                let relevant_edges = vertical_edges_by_y.entry(*y).or_default();
                let num_crossings = relevant_edges
                    .iter()
                    .map(|edge_x| if x <= edge_x { 1 } else { 0 })
                    .sum::<usize>();
                if num_crossings % 2 == 1 {
                    insides[i][j] = true;
                }
            }
        }
    }

    let mut res = 0;
    for i in 0..lines.len() - 1 {
        for j in i + 1..lines.len() {
            let (x1, y1) = lines[i];
            let (x2, y2) = lines[j];

            let area = (x1.abs_diff(x2) + 1) * (y1.abs_diff(y2) + 1);
            if area <= res {
                continue;
            }

            let (x1, y1) = (squeezed_x_indices[&x1], squeezed_y_indices[&y1]);
            let (x2, y2) = (squeezed_x_indices[&x2], squeezed_y_indices[&y2]);

            let (x1, x2) = (min(x1, x2), max(x1, x2));
            let (y1, y2) = (min(y1, y2), max(y1, y2));

            if (x1..=x2)
                .map(|x| (y1..=y2).map(|y| insides[y][x]).all(|b| b))
                .all(|b| b)
            {
                res = area;
            }
        }
    }
    println!("{res}"); // 1537458069
}
