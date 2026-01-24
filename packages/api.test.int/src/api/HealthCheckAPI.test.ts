import { describe, expect, test } from "@jest/globals"
import { api } from "@alchemypdf.proc/api"
import { getConfig } from '../config'

describe("HealthCheckAPI", () => {
  test("ping", async () => {
    // setup
    const _api = api({ config: getConfig() })

    // execute
    const result = await _api.healthCheck().ping()

    // assert
    expect(result.status).toBe(200)
    expect(result.data.statusCode).toBe(200)
    expect(result.data.message).toBe("Ok")
  })
})