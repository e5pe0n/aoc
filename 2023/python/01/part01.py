import re
from pathlib import Path

# text = """1abc2
# pqr3stu8vwx
# a1b2c3d4e5f
# treb7uchet
# """

with open(Path(__file__).parent / "input.txt", "r") as f:
    text = f.read()

RE = re.compile(r"[0-9]")

sm = 0
for s in text.strip().splitlines():
    m = RE.findall(s)
    sm += int(m[0] + m[-1])

print(sm)  # 56049
