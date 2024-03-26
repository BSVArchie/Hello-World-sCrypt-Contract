import { Helloworld } from './src/contracts/helloworld'
import { getDefaultSigner } from './tests/utils/txHelper'
import { toByteString, sha256 } from 'scrypt-ts'

;(async () => {
    const message = toByteString('hello world', true)

    await Helloworld.loadArtifact()
    const instance = new Helloworld(sha256(message))

    // connect to a signer
    await instance.connect(getDefaultSigner())

    // deploy the contract and lock up 42 satoshis in it
    const deployTx = await instance.deploy(42)
    console.log('Helloworld contract deployed: ', deployTx.id)

    // contract call
    const { tx: callTx } = await instance.methods.unlock(message)
    console.log('Helloworld contract `unlock` called: ', callTx.id)
})()
