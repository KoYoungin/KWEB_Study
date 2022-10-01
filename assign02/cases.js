const facto = num => {
    res = 1;
    for(let i = 2; i<=num; i++) res *= i;
    return res;
};
const permutation = (n,r) => {
    const nFact = facto(n);
    const nrFact = facto(n-r);
    return nFact/nrFact;
};
const combination = (n,r) => {
    const nFact = facto(n);
    const nrFact = facto(n-r);
    const rFact = facto(r);
    return nFact/(nrFact*rFact);
};
const multiPermutation = (n,r) => {
    return Math.pow(n,r);
};
const multiCombination = (n,r) => {
    return combination(n+r-1,r);
};

module.exports = {
    permutation,
    combination,
    multiPermutation,
    multiCombination,
}