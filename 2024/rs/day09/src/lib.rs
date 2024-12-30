use std::fs;
use std::path;

fn read_contents(filename: &str) -> Vec<i64> {
    let contents = fs::read_to_string(path::Path::new(filename)).unwrap();
    let contents = contents.trim();
    contents
        .chars()
        .map(|c| c.to_digit(10).unwrap() as i64)
        .collect::<_>()
}

pub fn solve01(filename: &str) -> i64 {
    let mut disk_map = read_contents(filename);
    let mut left: i64 = 0;
    let mut right = (disk_map.len() - 1) as i64;
    let mut res = 0;
    let mut i = 0;
    while left <= right {
        for j in i..(i + disk_map[left as usize]) {
            res += j * (left / 2);
        }
        i += disk_map[left as usize];
        left += 1;
        while left < right && disk_map[left as usize] > 0 {
            if disk_map[left as usize] >= disk_map[right as usize] {
                for j in i..(i + disk_map[right as usize]) {
                    res += j * (right / 2);
                }
                i += disk_map[right as usize];
                disk_map[left as usize] -= disk_map[right as usize];
                disk_map[right as usize] = 0;
                right -= 2;
            } else {
                for j in i..(i + disk_map[left as usize]) {
                    res += j * (right / 2);
                }
                i += disk_map[left as usize];
                disk_map[right as usize] -= disk_map[left as usize];
                disk_map[left as usize] = 0;
            }
        }
        left += 1;
    }
    res
}

#[cfg(test)]
mod part01_tests {
    use crate::solve01;

    #[test]
    fn example() {
        let result = solve01("input-example.txt");
        assert_eq!(result, 1928);
    }

    #[test]
    fn input() {
        let result = solve01("input.txt");
        assert_eq!(result, 6367087064415);
    }
}

#[derive(Debug)]
struct File {
    ptr: i64,
    length: i64,
    prev: Option<usize>,
    next: Option<usize>,
}

pub fn solve02(filename: &str) -> i64 {
    let disk_map = read_contents(filename);
    let mut files: Vec<File> = vec![File {
        ptr: 0,
        length: disk_map[0],
        prev: None,
        next: None,
    }];
    let mut ptr = files[0].length;
    let mut curr_id = 0;
    for i in 1..disk_map.len() {
        if i % 2 == 0 {
            let next_id = curr_id + 1;
            let file = File {
                ptr,
                length: disk_map[i],
                prev: Some(curr_id),
                next: None,
            };
            ptr += file.length;
            files[curr_id].next = Some(next_id);
            files.push(file);
            curr_id = next_id;
        } else {
            ptr += disk_map[i];
        }
    }
    let mut touched = vec![false; files.len()];
    let mut maybe_curr_id = Some(curr_id);
    while let Some(curr_id) = maybe_curr_id {
        let mut head_id = 0;
        let next_maybe_curr_id = files[curr_id].prev;
        if !touched[curr_id] {
            while files[head_id].next.is_some() && files[head_id].ptr < files[curr_id].ptr {
                let next_head_id = files[head_id].next.unwrap();
                let space = files[next_head_id].ptr - (files[head_id].ptr + files[head_id].length);
                if space >= files[curr_id].length {
                    files[curr_id].ptr = files[head_id].ptr + files[head_id].length;
                    if let Some(prev_id) = files[curr_id].prev {
                        files[prev_id].next = files[curr_id].next;
                    }
                    if let Some(next_id) = files[curr_id].next {
                        files[next_id].prev = files[curr_id].prev;
                    }
                    let next_head_id = files[head_id].next.unwrap();
                    files[head_id].next = Some(curr_id);
                    files[curr_id].prev = Some(head_id);
                    files[curr_id].next = Some(next_head_id);
                    files[next_head_id].prev = Some(curr_id);
                    break;
                }
                head_id = next_head_id;
            }
        }
        touched[curr_id] = true;
        maybe_curr_id = next_maybe_curr_id;
    }
    let mut res = 0;
    let mut maybe_curr_id = Some(0);
    while let Some(curr_id) = maybe_curr_id {
        let curr = &files[curr_id];
        let sum = (curr_id as i64)
            * (((curr.ptr + curr.length - 1) * (curr.ptr + curr.length)) / 2
                - ((curr.ptr - 1) * curr.ptr) / 2);
        res += sum;
        maybe_curr_id = curr.next;
    }
    res
}

#[cfg(test)]
mod part02_tests {
    use crate::solve02;

    #[test]
    fn example() {
        let result = solve02("input-example.txt");
        assert_eq!(result, 2858);
    }

    #[test]
    fn example02() {
        let result = solve02("input-example-02.txt");
        assert_eq!(result, 7262);
    }

    #[test]
    fn input() {
        let result = solve02("input.txt");
        assert_eq!(result, 6390781891880); // 2.44s vs. 312ms in Node.js; why such slow in Rust?
    }
}
