use std::{cmp::Ordering, fs};

#[derive(PartialEq, Eq, PartialOrd, Ord, Debug)]
enum Type {
    FiveOfAKind,
    FourOfAKind,
    FullHouse,
    ThreeOfAKind,
    TwoPair,
    OnePair,
    HighCard,
}

#[derive(PartialEq, Eq, Debug)]
struct Card {
    labels: Vec<u32>,
    bid: u64,
    typ: Type,
}

impl Card {
    pub fn new(labels: Vec<u32>, bid: u64) -> Card {
        let mut cnter = [0; 15];
        for &label in labels.iter() {
            cnter[label as usize] += 1;
        }
        let mut sorted_cnter = cnter.iter().collect::<Vec<_>>();
        sorted_cnter.sort_by(|a, b| b.cmp(a));
        let typ = match sorted_cnter[..] {
            [&5, ..] => Type::FiveOfAKind,
            [&4, ..] => Type::FourOfAKind,
            [&3, &2, ..] => Type::FullHouse,
            [&3, _, ..] => Type::ThreeOfAKind,
            [&2, &2, ..] => Type::TwoPair,
            [&2, &1, ..] => Type::OnePair,
            _ => Type::HighCard,
        };
        Card {
            labels,
            bid,
            typ: pretend(typ, cnter[1]),
        }
    }
}

impl PartialOrd for Card {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Ord for Card {
    fn cmp(&self, other: &Self) -> Ordering {
        match other.typ.cmp(&self.typ) {
            Ordering::Equal => self.labels.cmp(&other.labels),
            v => v,
        }
    }
}

fn pretend(typ: Type, js: u32) -> Type {
    match js {
        0 => typ,
        1 => match typ {
            Type::FourOfAKind => Type::FiveOfAKind,
            Type::ThreeOfAKind => Type::FourOfAKind,
            Type::TwoPair => Type::FullHouse,
            Type::OnePair => Type::ThreeOfAKind,
            Type::HighCard => Type::OnePair,
            _ => typ,
        },
        2 => match typ {
            Type::FullHouse => Type::FiveOfAKind,
            Type::TwoPair => Type::FourOfAKind,
            Type::OnePair => Type::ThreeOfAKind,
            _ => typ,
        },
        3 => match typ {
            Type::FullHouse => Type::FiveOfAKind,
            Type::ThreeOfAKind => Type::FourOfAKind,
            _ => typ,
        },
        4 => match typ {
            Type::FourOfAKind => Type::FiveOfAKind,
            _ => typ,
        },
        5 => Type::FiveOfAKind,
        _ => panic!("invalid card type: {typ:?}"),
    }
}

pub fn solve() {
    // let text = "32T3K 765
    // T55J5 684
    // KK677 28
    // KTJJT 220
    // QQQJA 483
    // ";
    let text = fs::read_to_string("input.txt").unwrap();

    let mut cards = text
        .trim()
        .split("\n")
        .map(|line| {
            let line = line.trim();
            let labels_bid_s = line.split(" ").collect::<Vec<_>>();
            let labels = labels_bid_s[0]
                .chars()
                .map(|c| match c {
                    'T' => 10,
                    'J' => 1,
                    'Q' => 12,
                    'K' => 13,
                    'A' => 14,
                    _ => c.to_digit(10).unwrap(),
                })
                .collect::<Vec<_>>();
            Card::new(labels, labels_bid_s[1].parse::<u64>().unwrap())
        })
        .collect::<Vec<_>>();

    cards.sort();

    let res = cards
        .into_iter()
        .enumerate()
        .fold(0, |acc, (i, v)| acc + v.bid * ((i as u64) + 1));

    println!("{res}"); // 254083736
}
