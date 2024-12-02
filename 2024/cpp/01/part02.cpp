#include <bits/stdc++.h>

#include <fstream>
#include <iostream>
#include <map>
#include <string>
#include <vector>

using namespace std;

typedef long long ll;

int main() {
  // ifstream ifs{"./01/input-example.txt"};
  ifstream ifs{"./01/input.txt"};
  vector<ll> leftVec, rightVec;
  for (ll x, y; ifs >> x, ifs >> y;) {
    leftVec.push_back(x);
    rightVec.push_back(y);
  }
  map<ll, ll> m;
  for (auto v : rightVec) {
    m[v]++;
  }
  ll sum = 0;
  for (auto v : leftVec) {
    sum += v * m[v];
  }
  printf("%lld\n", sum);
}
