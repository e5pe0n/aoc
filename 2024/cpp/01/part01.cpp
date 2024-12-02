#include <bits/stdc++.h>

#include <fstream>
#include <iostream>
#include <string>
#include <vector>

using namespace std;

typedef long long ll;

int main() {
  //   ifstream ifs{"./01/input-example.txt"};
  ifstream ifs{"./01/input.txt"};
  vector<ll> leftVec, rightVec;
  for (ll x, y; ifs >> x, ifs >> y;) {
    leftVec.push_back(x);
    rightVec.push_back(y);
  }
  sort(leftVec.begin(), leftVec.end(), less<ll>());
  sort(rightVec.begin(), rightVec.end(), less<ll>());
  ll sum = 0;
  for (ll i = 0; i < leftVec.size(); ++i) {
    sum += abs(leftVec[i] - rightVec[i]);
  }
  printf("%lld\n", sum);
}
