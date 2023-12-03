from pathlib import Path
from dataclasses import dataclass
from typing import TypedDict

# text = """Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
# Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
# Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
# Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
# Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
# """

with open(Path(__file__).parent / "./input.txt", "r") as f:
    text = f.read()


class Subset(TypedDict):
    num_blues: int
    num_greens: int
    num_reds: int


@dataclass
class Game:
    id: int
    subsets: list[Subset]


games: list[Game] = []
for line in text.strip().splitlines():
    head, tail = line.split(":")
    _, game_ns = head.strip().split(" ")

    subsets: list[Subset] = []
    for subset_s in tail.strip().split(";"):
        subset: Subset = {
            "num_blues": 0,
            "num_greens": 0,
            "num_reds": 0,
        }

        for color_s in subset_s.strip().split(","):
            sn, color = color_s.strip().split(" ")
            n = int(sn)
            if color == "blue":
                subset["num_blues"] = n
            elif color == "green":
                subset["num_greens"] = n
            else:
                subset["num_reds"] = n

        subsets.append(subset)

    games.append(Game(id=int(game_ns), subsets=subsets))

sm = 0
for game in games:
    max_subset: Subset = {
        "num_blues": 0,
        "num_greens": 0,
        "num_reds": 0,
    }
    for subset in game.subsets:
        max_subset["num_blues"] = max(max_subset["num_blues"], subset["num_blues"])
        max_subset["num_greens"] = max(max_subset["num_greens"], subset["num_greens"])
        max_subset["num_reds"] = max(max_subset["num_reds"], subset["num_reds"])

    sm += max_subset["num_blues"] * max_subset["num_greens"] * max_subset["num_reds"]

print(sm)  # 65122
