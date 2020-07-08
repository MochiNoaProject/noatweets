import { isHiddenText, extractURLString } from "./tweet"

const NOA_TO_ISSHO = "#のあといっしょ"

describe("extractURLString", () => {
  describe("URLじゃない場合", () => {
    it("そのままreturnされていること", () => {
      const expected = `https://example:asdfasdf ${NOA_TO_ISSHO}`
      expect(extractURLString(expected)).toEqual(expected)
    })
  })
  describe("URLが複数存在する場合", () => {
    it("URLを削った文字がreturnされること", () => {
      expect(extractURLString(`https://example.com http://example.com ${NOA_TO_ISSHO}`)).toEqual(`${NOA_TO_ISSHO}`)
    })
  })
})

describe("isHiddenText", () => {
  describe(`${NOA_TO_ISSHO}しか入ってない場合`, () => {
    it("trueになること", () => {
      expect(isHiddenText(NOA_TO_ISSHO)).toEqual(true)
    })
  })

  describe(`渡された文字列が空白のみだった場合`, () => {
    it("trueになること", () => {
      expect(isHiddenText('')).toEqual(true)
    })
  })

  describe(`↑のどちらもを満たしていない場合`, () => {
    it("falseになること", () => {
      expect(isHiddenText('ぎゅっ（圧死） #のあといっしょ')).toEqual(false)
    })
  })
})
