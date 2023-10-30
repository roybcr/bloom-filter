import {BloomFilter} from './bloom.filter';

(() => {
    const bf = new BloomFilter(2);
    bf.add('doskadokdsak');
    bf.add('dsaliedoqidd');
    console.log(bf.has('doskadokdsak'));
    console.log(bf.has('dsaliedoqidd'));
    console.log(bf.has('doskadokdsa'));
})();
