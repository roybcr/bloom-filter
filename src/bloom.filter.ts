type Bit		= 0 | 1;
type BitArray	= Array<Bit>;

export class BloomFilter {

	private bloomFilter: BitArray = [];

    constructor(size: number) {
		for (let i = 0; i < size; i ++) {
			this.bloomFilter.push(0);
		}
	}

	public add(elm: string)  {
		const hashIdx1 = BloomFilter.hash1(elm) % this.bloomFilter.length;
		const hashIdx2 = BloomFilter.hash2(elm) % this.bloomFilter.length;
		const hashIdx3 = BloomFilter.hash3(elm) % this.bloomFilter.length;

		this.bloomFilter[hashIdx1] = 1;
		this.bloomFilter[hashIdx2] = 1;
		this.bloomFilter[hashIdx3] = 1;
	}

	public has(elm: string)  {
		const hashIdx1 = BloomFilter.hash1(elm) % this.bloomFilter.length;
		const hashIdx2 = BloomFilter.hash2(elm) % this.bloomFilter.length;
		const hashIdx3 = BloomFilter.hash3(elm) % this.bloomFilter.length;
		
		return (
			this.bloomFilter[hashIdx1] === 1 &&
			this.bloomFilter[hashIdx2] === 1 &&
			this.bloomFilter[hashIdx3] === 1
		);
	}

    /**
     * The hash function used to map elements of the set to the bit array.
     * (MurmurHash)[https://en.wikipedia.org/wiki/MurmurHash]
     *
     */

    private static hash(str: string, seed: number): number {
		const m0	= 5;
		const r1	= 15;
		const r2	= 13;
		const n0	= 0xe6546b64;
		const c1	= 0xcc9e2d51;
		const c2	= 0x1b873593;

		let i		= 0;
		let s		= seed;

		while (i < str.length) {
			let k = str.charCodeAt(i++);

			k = (k & 0xff) | ((k <<8) & 0xff00);
			k = (k & 0xffff) | ((k << 16) & 0xffff0000);
			k = k * c1;
			k = (k << r1) | (k >>> (32 - r1));
			k = k * c2;

			s ^= k;
			s = (s << r2) | (s >>> (32 - r2));
			s = s * m0 + n0;
		}

		s ^= s >>> 16;
		s = s * 0x85ebca6b;
		s ^= s >>> 13;
		s = s * 0xc2b2ae35;
		s ^= s >>> 16; 

		return s;
	}

	private static hash1 = (str: string) => BloomFilter.hash(str, 0x123);
	private static hash2 = (str: string) => BloomFilter.hash(str, 0x456);
	private static hash3 = (str: string) => BloomFilter.hash(str, 0x789);
}
