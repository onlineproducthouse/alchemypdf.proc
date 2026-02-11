import { describe, expect, test } from '@jest/globals'
import { constants } from '@alchemypdf.proc/constants'
import { getConfig } from '../config'
import { api } from '@alchemypdf.proc/api'
import { AlcheMyPdfRequest, DefaultHTTPResponse, AlcheMyPdfCreateRequest } from '@alchemypdf.proc/contracts'
import { AxiosResponse } from 'axios'
import { v4 as uuidV4 } from 'uuid'

const htmlText: string = `<!DOCTYPE html>
<html>
<head>
    <title>My Webpage Title</title>
</head>
<body>
    <h1>This is a Main Heading</h1>
    <p>This is a paragraph of text in the body.</p>
</body>
</html>`

describe("AlcheMyPdfAPI", () => {
  test.skip("create", async () => {
    // setup
    const config = getConfig()
    const _api = api({ config })

    // execute
    const result: AxiosResponse<unknown> = await _api.alcheMyPdf().create({
      callbackUrl: config.callbackUrl(),
      clientReference: uuidV4(),
      content: htmlText,
    })

    // assert
    expect(result.status).toBe(200)
    expect((result.data as DefaultHTTPResponse).statusCode).toBe(200)
    expect((result.data as DefaultHTTPResponse).message).toBe("Ok")
  })

  test.skip("getByClientReference", async () => {
    // setup
    const config = getConfig()
    const _api = api({ config })

    const requestPayload: AlcheMyPdfCreateRequest = {
      callbackUrl: config.callbackUrl(),
      clientReference: uuidV4(),
      content: htmlText,
    }

    const createResponse: AxiosResponse<unknown> = await _api.alcheMyPdf().create(requestPayload)
    expect(createResponse.status).toBe(200)

    // execute
    const result: AxiosResponse<unknown> = await _api.alcheMyPdf()
      .getByClientReference(requestPayload.clientReference)

    // assert
    const resultPayload = result.data as AlcheMyPdfRequest[]

    expect(result.status).toBe(200)
    expect(resultPayload.length).toBe(1)
    for (let i = 0; i < resultPayload.length; i++) {
      expect(resultPayload[i].callbackUrl).toBe(requestPayload.callbackUrl)
      expect(resultPayload[i].clientReference).toBe(requestPayload.clientReference)
      expect(resultPayload[i].content).toBe("")
      expect(resultPayload[i].requestStateKey).toBe(constants.api.REQUEST_STATE_KEY_PENDING)
    }
  })

  test("getWithContentByClientReference", async () => {
    // setup
    const config = getConfig()
    const _api = api({ config })

    const requestPayload: AlcheMyPdfCreateRequest = {
      callbackUrl: config.callbackUrl(),
      clientReference: uuidV4(),
      content: htmlText,
    }

    console.log(requestPayload.content)

    const createResponse: AxiosResponse<unknown> = await _api.alcheMyPdf().create(requestPayload)
    expect(createResponse.status).toBe(200)

    // execute
    const result: AxiosResponse<unknown> = await _api.alcheMyPdf()
      .getWithContentByClientReference(requestPayload.clientReference)

    // assert
    const resultPayload = result.data as AlcheMyPdfRequest[]

    console.log(resultPayload[0].content)

    expect(result.status).toBe(200)
    expect(resultPayload.length).toBe(1)
    for (let i = 0; i < resultPayload.length; i++) {
      console.log(resultPayload[i].content)

      expect(resultPayload[i].callbackUrl).toBe(requestPayload.callbackUrl)
      expect(resultPayload[i].clientReference).toBe(requestPayload.clientReference)
      expect(resultPayload[i].content).toMatch(requestPayload.content)
      expect(resultPayload[i].requestStateKey).toBe(constants.api.REQUEST_STATE_KEY_PENDING)
    }
  })

  test.skip("getPending", async () => {
    // setup
    const config = getConfig()
    const _api = api({ config })

    const requestPayload: AlcheMyPdfCreateRequest = {
      callbackUrl: config.callbackUrl(),
      clientReference: uuidV4(),
      content: htmlText,
    }

    const createResponse: AxiosResponse<unknown> = await _api.alcheMyPdf().create(requestPayload)
    expect(createResponse.status).toBe(200)

    // execute
    const result: AxiosResponse<unknown> = await _api.alcheMyPdf().getPending()

    // assert
    const resultPayload = result.data as AlcheMyPdfRequest

    expect(result.status).toBe(200)
    expect(resultPayload.callbackUrl).toBe(requestPayload.callbackUrl)
    expect(resultPayload.clientReference.length).toBe(36)
    expect(resultPayload.content).toBe(requestPayload.content)
    expect(resultPayload.requestStateKey).toBe(constants.api.REQUEST_STATE_KEY_PENDING)

    const getResponse: AxiosResponse<unknown> = await _api.alcheMyPdf()
      .getByClientReference(resultPayload.clientReference)

    const getResponsePayload = getResponse.data as AlcheMyPdfRequest[]

    expect(getResponse.status).toBe(200)
    expect(getResponsePayload.length).toBe(1)
    for (let i = 0; i < getResponsePayload.length; i++) {
      expect(getResponsePayload[i].callbackUrl).toBe(requestPayload.callbackUrl)
      expect(getResponsePayload[i].clientReference).toBe(resultPayload.clientReference)
      expect(getResponsePayload[i].content).toBe("")
      expect(getResponsePayload[i].requestStateKey).toBe(constants.api.REQUEST_STATE_KEY_IN_PROGRESS)
    }
  })

  test("complete : pending -> in progress -> pending", async () => {
    // setup
    const config = getConfig()
    const _api = api({ config })

    const requestPayload: AlcheMyPdfCreateRequest = {
      callbackUrl: config.callbackUrl(),
      clientReference: uuidV4(),
      content: htmlText,
    }

    const createResponse: AxiosResponse<unknown> = await _api.alcheMyPdf().create(requestPayload)
    expect(createResponse.status).toBe(200)

    const getPendingResponse: AxiosResponse<AlcheMyPdfRequest> = await _api.alcheMyPdf().getPending()
    expect(getPendingResponse.status).toBe(200)

    // execute
    const result: AxiosResponse<DefaultHTTPResponse> = await _api.alcheMyPdf().complete({
      requestId: getPendingResponse.data.requestId,
      success: false,
    })

    // assert
    expect(result.status).toBe(200)
    expect(result.data.statusCode).toBe(200)
    expect(result.data.message).toBe("Ok")

    const getResponse: AxiosResponse<unknown> = await _api.alcheMyPdf()
      .getByClientReference(getPendingResponse.data.clientReference)

    const getResponsePayload = getResponse.data as AlcheMyPdfRequest[]

    expect(getResponse.status).toBe(200)
    expect(getResponsePayload.length).toBe(1)
    for (let i = 0; i < getResponsePayload.length; i++) {
      expect(getResponsePayload[i].callbackUrl).toBe(requestPayload.callbackUrl)
      expect(getResponsePayload[i].clientReference).toBe(getPendingResponse.data.clientReference)
      expect(getResponsePayload[i].content).toBe("")
      expect(getResponsePayload[i].requestStateKey).toBe(constants.api.REQUEST_STATE_KEY_PENDING)
    }
  })

  test("complete : pending -> in progress -> complete", async () => {
    // setup
    const config = getConfig()
    const _api = api({ config })

    const requestPayload: AlcheMyPdfCreateRequest = {
      callbackUrl: config.callbackUrl(),
      clientReference: uuidV4(),
      content: htmlText,
    }

    const createResponse: AxiosResponse<unknown> = await _api.alcheMyPdf().create(requestPayload)
    expect(createResponse.status).toBe(200)

    const getPendingResponse: AxiosResponse<AlcheMyPdfRequest> = await _api.alcheMyPdf().getPending()
    expect(getPendingResponse.status).toBe(200)

    // execute
    const result: AxiosResponse<DefaultHTTPResponse> = await _api.alcheMyPdf().complete({
      requestId: getPendingResponse.data.requestId,
      success: true,
    })

    // assert
    expect(result.status).toBe(200)
    expect(result.data.statusCode).toBe(200)
    expect(result.data.message).toBe("Ok")

    const getResponse: AxiosResponse<unknown> = await _api.alcheMyPdf()
      .getByClientReference(getPendingResponse.data.clientReference)

    const getResponsePayload = getResponse.data as AlcheMyPdfRequest[]

    expect(getResponse.status).toBe(200)
    expect(getResponsePayload.length).toBe(1)
    for (let i = 0; i < getResponsePayload.length; i++) {
      expect(getResponsePayload[i].callbackUrl).toBe(requestPayload.callbackUrl)
      expect(getResponsePayload[i].clientReference).toBe(getPendingResponse.data.clientReference)
      expect(getResponsePayload[i].content).toBe("")
      expect(getResponsePayload[i].requestStateKey).toBe(constants.api.REQUEST_STATE_KEY_COMPLETED)
    }
  })
})
