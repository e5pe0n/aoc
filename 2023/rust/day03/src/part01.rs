use std::fs;

pub fn solve() {
    //     let text = "467..114..
    // ...*......
    // ..35..633.
    // ......#...
    // 617*......
    // .....+.58.
    // ..592.....
    // ......755.
    // ...$.*....
    // .664.598..
    // ";

    let text = fs::read_to_string("input.txt").unwrap();

    let schematic = text
        .trim()
        .split("\n")
        .map(|line| line.chars().collect::<Vec<_>>())
        .collect::<Vec<_>>();

    let didjs = [-1, 0, 1]
        .into_iter()
        .flat_map(|di| [-1, 0, 1].map(|dj| (di, dj)))
        .collect::<Vec<(i32, i32)>>();

    let mut visited = vec![vec![false; schematic[0].len()]; schematic.len()];

    let h = schematic.len() as i32;
    let w = schematic[0].len() as i32;

    let mut sum = 0;
    for (i, line) in schematic.iter().enumerate() {
        for (j, c) in line.iter().enumerate() {
            if c.is_ascii_digit() || *c == '.' {
                continue;
            }
            for (di, dj) in didjs.iter() {
                let ni = (i as i32) + di;
                let nj = (j as i32) + dj;
                if !(0 <= ni && ni < h && 0 <= nj && nj < w) {
                    continue;
                }
                if !schematic[ni as usize][nj as usize].is_ascii_digit()
                    || visited[ni as usize][nj as usize]
                {
                    continue;
                }

                visited[ni as usize][nj as usize] = true;

                let mut _j = nj - 1;
                while 0 <= _j && schematic[ni as usize][_j as usize].is_ascii_digit() {
                    visited[ni as usize][_j as usize] = true;
                    _j -= 1;
                }
                let lj = (_j + 1) as usize;

                _j = nj + 1;
                while _j < w && schematic[ni as usize][_j as usize].is_ascii_digit() {
                    visited[ni as usize][_j as usize] = true;
                    _j += 1;
                }
                let rj = _j as usize;

                let n = schematic[ni as usize][lj..rj]
                    .iter()
                    .collect::<String>()
                    .parse::<i32>()
                    .unwrap();
                sum += n;
            }
        }
    }
    println!("{sum}"); // 539590
}
