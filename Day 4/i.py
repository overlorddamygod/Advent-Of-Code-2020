#! python3
import re

passport_re = re.compile(r'(\w{3}):([0-9#A-Za-z]+)')
hcl_re = re.compile(r'#[0-9a-f]{6}')
pid_re = re.compile(r'\d{9}(?!\S)') # neg lookahead bc of one pid with 10 digits
hgt_re = re.compile(r'(\d{,3})(cm|in)')

with open('input.txt', 'r') as infile:
    raw_data = infile.read().split('\n\n')

input_lst = []
for s in raw_data:
    dic = {}
    mo = passport_re.findall(s)
    for t in mo:
        k, v = t[0], t[1]
        dic[k] = v
    input_lst.append(dic)

valid_passports = [x for x in input_lst if len(x) == 8 or len(x) == 7 and 'cid' not in x.keys()]
print(len(valid_passports))

valid_count = 0
for p in valid_passports:
    try:
        byr = int(p['byr'])
        iyr = int(p['iyr'])
        eyr = int(p['eyr'])
        ecl = p['ecl']
        hcl = hcl_re.match(p['hcl'])
        pid = pid_re.match(p['pid'])
        hgt = hgt_re.search(p['hgt'])

        if byr in range(1920, 2003):
            if iyr in range(2010, 2021):
                if eyr in range(2020, 2031):
                    if ecl in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']:
                        if hcl:
                            if pid:
                                if hgt:
                                    units = hgt.group(2)
                                    height = int(hgt.group(1))
                                    if units == 'cm' and height in range(150, 194):
                                        valid_count += 1
                                    elif units == 'in' and height in range(59, 77):
                                        valid_count += 1

    except KeyError:
        pass

print(valid_count)