import os
import math

DAY_DIR = os.path.dirname(os.path.realpath(__file__))
INPUT_FILE = os.path.join(DAY_DIR, 'input.txt')

SAMPLE_TEXT = '''467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..'''

def read_input(sample=False):
  if sample:
    return SAMPLE_TEXT.splitlines()
  else:
    with open(INPUT_FILE, 'r') as fp:
      return fp.readlines()

def get_input(sample=False):
  return read_input(sample)

def part_one(inp):
  sum_of_parts = 0

  for y, row in enumerate(inp):
    num_buffer = num_start = ''
    for x, char in enumerate(row):
      if (not char.isalnum() or x == len(row) - 1) and num_buffer:
        # GENERATE RANGE OF 2D INDEXES
        x_min, x_max = (max(num_start - 1, 0), min(x + 1, len(row)))
        y_min, y_max = (max(y - 1, 0), min(y + 2, len(inp)))
        row_slice = inp[y_min:y_max]
        for row in row_slice:
          col_slice = row[x_min:x_max]
          if any((char != '.' and not char.isalnum()) for char in col_slice):
            sum_of_parts += int(num_buffer)
            break
        num_buffer = num_start = ''
      elif char.isdigit():
        if not num_start:
          num_start = x
        num_buffer += char
  return sum_of_parts


def part_two(inp):
  gear_locs = {}

  for y, row in enumerate(inp):
    num_buffer = num_start = ''
    for x, char in enumerate(row):
      if (not char.isalnum() or x == len(row) - 1) and num_buffer:
        x_min, x_max = (max(num_start - 1, 0), min(x + 1, len(row)))
        y_min, y_max = (max(y - 1, 0), min(y + 2, len(inp)))
        row_slice = inp[y_min:y_max]
        for row in row_slice:
          col_slice = row[x_min:x_max]
          found_gear = col_slice.find('*')
          if found_gear >= 0:
              # HASHING COORDS
              coords = f'{found_gear + x_min}/{y_min}'
              if not gear_locs.get(coords):
                gear_locs[coords] = [int(num_buffer)]
              else:
                gear_locs[coords].append(int(num_buffer))
          y_min += 1
        num_buffer = num_start = ''
      elif char.isdigit():
        if not num_start:
          num_start = x
        num_buffer += char

  return sum(math.prod(nums) for nums in gear_locs.values() if len(nums) == 2)


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