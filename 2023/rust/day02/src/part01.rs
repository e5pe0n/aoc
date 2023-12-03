use std::fs;

static MAX_NUM_REDS: u32 = 12;
static MAX_NUM_GREENS: u32 = 12;
static MAX_NUM_BLUES: u32 = 14;

struct Subset {
    num_blues: u32,
    num_greens: u32,
    num_reds: u32,
}

struct Game {
    id: u32,
    subsets: Vec<Subset>,
}

pub fn solve() {
    //     let text = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    // Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    // Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    // Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    // Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
    // ";

    let text = fs::read_to_string("input.txt").unwrap();

    let games = text.trim().split("\n").map(|line| {
        let game_subsets_s = line.trim().split(":").collect::<Vec<_>>();
        let game_s = game_subsets_s[0].split(" ").collect::<Vec<_>>();
        let game_id = game_s[1].parse::<u32>().unwrap();
        let subsets = game_subsets_s[1]
            .trim()
            .split(";")
            .map(|subset_s| {
                let mut subset = Subset {
                    num_blues: 0,
                    num_greens: 0,
                    num_reds: 0,
                };

                subset_s.trim().split(",").for_each(|color_s| {
                    let s = color_s.trim().split(" ").collect::<Vec<_>>();
                    let n = s[0].parse::<u32>().unwrap();
                    if s[1] == "blue" {
                        subset.num_blues = n;
                    } else if s[1] == "green" {
                        subset.num_greens = n;
                    } else {
                        subset.num_reds = n;
                    }
                });

                let subset = subset;

                subset
            })
            .collect::<Vec<_>>();

        Game {
            id: game_id,
            subsets,
        }
    });

    let sum = games
        .map(|game| {
            for subset in game.subsets.iter() {
                if subset.num_blues > MAX_NUM_BLUES
                    || subset.num_greens > MAX_NUM_GREENS
                    || subset.num_reds > MAX_NUM_REDS
                {
                    return 0;
                }
            }

            game.id
        })
        .sum::<u32>();

    println!("{}", sum); // 2683
}
