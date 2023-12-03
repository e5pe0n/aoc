import re
from pathlib import Path

# text = """
# two1nine
# eightwothree
# abcone2threexyz
# xtwone3four
# 4nineeightseven2
# zoneight234
# 7pqrstsixteen
# """
with open(Path(__file__).parent / "./input.txt", "r") as f:
    text = f.read()

d = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
} | {str(i): str(i) for i in range(1, 10)}
RE = re.compile(r"(" + r"|".join(d.keys()) + r")")

rev_d = {"".join(reversed(k)): v for k, v in d.items()}
REV_RE = re.compile(r"(" + r"|".join(rev_d.keys()) + r")")

ss = text.strip().splitlines()
rev_ss = "".join(reversed(text.strip())).splitlines()

fsts: list[str] = []
for s in ss:
    m = RE.findall(s)
    fsts.append(d[m[0]])

lasts: list[str] = []
for s in rev_ss:
    m = REV_RE.findall(s)
    lasts.append(rev_d[m[0]])

sm = 0
for fst, last in zip(fsts, reversed(lasts)):
    sm += int(fst + last)

print(sm)  # 54530
