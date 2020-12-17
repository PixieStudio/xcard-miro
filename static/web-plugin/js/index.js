const icon = '<g id="ac2b6c76-98b9-4dba-a94d-5e4733ee953b" data-name="Calque 1"><path d="M19.18.82V23.18H4.82V.82H19.18M20,0H4V24H20V0Z" transform="translate(-4)"/></g><g id="a6bc4c45-949e-40c3-8d2d-a429b3c514d2" data-name="Calque 2 - copie"><path d="M12.85,17.7v-.54q1.44,0,1.44-.36a1.44,1.44,0,0,0-.34-.74l-2.32-3.44L9.22,16a2.13,2.13,0,0,0-.09.27.84.84,0,0,0,0,.27c0,.42.52.63,1.57.63v.54H6v-.54a3.22,3.22,0,0,0,2.2-1.3l3-3.93L7.85,7.12a1.84,1.84,0,0,0-.72-.61,2.57,2.57,0,0,0-1.06-.2V5.77h5.14v.54q-1.29,0-1.29.48a.88.88,0,0,0,.2.48l2.19,3.25,2.13-3A1.34,1.34,0,0,0,14.56,7c0-.45-.43-.68-1.29-.68V5.77H17.8v.54A2.37,2.37,0,0,0,16,7L12.73,11.1l3.9,5.5a1.8,1.8,0,0,0,1.57.56v.54Z" transform="translate(-4)"/></g>'
const libraryTitle = 'XCard'

miro.onReady(() => {
    miro.initialize({
        extensionPoints: {
            bottomBar: {
                title: libraryTitle,
                svgIcon: icon,
                onClick: async () => {
                    const authorized = await miro.isAuthorized()
                    if (authorized) {
                        try {
                            localStorage.active = 'ok'
                            const xcard = await miro.board.widgets.get({
                                text: '<p>xcard plugin miro laflys</p>'
                            })
                            if (xcard.length == 0) {
                                await createShape()
                            } else {
                                await deleteShape(xcard[0].id)
                            }
                        } catch (e) {
                            miro.board.ui.openModal('web-plugin/cookies.html')
                        }

                    } else {
                        miro.board.ui.openModal('web-plugin/not-authorized.html')
                    }
                }
            }
        }
    })
})

async function createShape() {
    const viewport = await miro.board.viewport.get();
    const x = viewport.x + (viewport.width / 2);
    const y = viewport.y + (viewport.height / 2);
    await miro.board.widgets.create({
        type: 'SHAPE',
        width: 150000,
        height: 150000,
        x: x,
        y: y,
        text: '<p>xcard plugin miro laflys</p>',
        style: {
            backgroundColor: "#1a1a1a",
            backgroundOpacity: 1,
            borderColor: "#1a1a1a",
            borderOpacity: 1,
            borderStyle: 2,
            borderWidth: 2,
            shapeType: 3,
            textAlign: "c",
            textAlignVertical: "m"
        }
    })
}

async function deleteShape(xcard) {
    await miro.board.widgets.deleteById(xcard)
}
