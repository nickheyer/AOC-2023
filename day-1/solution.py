import os
import math

DAY_DIR = os.path.dirname(os.path.realpath(__file__))
INPUT_FILE = os.path.join(DAY_DIR, 'input.txt')

SAMPLE_TEXT = '''Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'''

def read_input(sample=False):
  if sample:
    return SAMPLE_TEXT.splitlines()
  else:
    with open(INPUT_FILE, 'r') as fp:
      return fp.readlines()
  
def parse_input(input_text):
  games = []

  for line in input_text:
    _, game_set = line.split(': ')
    round_sets = game_set.split(';')
    rounds = []
    for round in round_sets:
      round_set = round.strip().split(', ')
      rounds.append({ color: int(cubes) for cubes, color in (r.split(' ') for r in round_set)})
    games.append(rounds)

  return games

def get_input(sample=False):
  input_text = read_input(sample)
  parsed_input = parse_input(input_text)
  return parsed_input

def part_one(inp):
  sum_of_ids = 0

  for id, game in enumerate(inp):
    possible = True
    for round in game:
      totals = { 'red': 12, 'green': 13, 'blue': 14 }
      for color, cubes in round.items():
        totals[color] -= cubes
        if totals[color] < 0:
          possible = False
          break
      if not possible:
        break
    if possible:
      sum_of_ids += id + 1
  
  return sum_of_ids
      

def part_two(inp):
  sum_of_powers = 0

  for game in inp:
    totals = { 'red': 0, 'green': 0, 'blue': 0 }
    for round in game:
      for color, cubes in round.items():
        if totals[color] < cubes:
          totals[color] = cubes
    sum_of_powers += math.prod(totals.values())

  return sum_of_powers

def main():
  inp = get_input()
  part_one_solution = part_one(inp)
  if part_one_solution:
    print(f'The solution for part one is: {part_one_solution}')
  part_two_solution = part_two(inp)
  if part_two_solution:
    print(f'The solution for part two is: {part_two_solution}')

if __name__ == '__main__':
  main()