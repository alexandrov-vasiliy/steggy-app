class Drop {
    dropBorderOver = '4px dashed #006f53'
    dropBorderNormal = '4px dashed #8a8a8a'
    dropBorderError = '4px dashed #721F1FFF'

    constructor(id) {
        this.element = document.getElementById(id)
        this.addDragOver()
        this.addDragLeave()
    }

    clear() {
        this.element.value = null
        this.element.style.border = this.dropBorderNormal
    }

    addDragOver() {
        this.element.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.element.style.border = this.dropBorderOver
        })
    }

    addDragLeave(handler) {
        this.element.addEventListener('dragleave',  (e) => {
            e.preventDefault();
            this.element.style.border = this.dropBorderNormal
        });
    }
}

class ImageDrop extends Drop {
    constructor(id, previewId) {
        super(id);
        this.previewElement = document.getElementById(previewId);
        this.imageFile = null
        this.addImageDrop();
    }

    addImageDrop() {
        this.element.addEventListener('drop', (e) => {
            try {
                e.preventDefault();
                const file = e.dataTransfer.files[0];

                if(file.type !== 'image/png') {
                    throw new Error('Incorrect image format use only png')
                }

                const reader = new FileReader();

                this.imageFile = file

                reader.onload = () => {
                    this.previewElement.src = reader.result;
                };

                reader.readAsDataURL(file);
            } catch (e) {
                console.error(e)
                this.element.style.border = this.dropBorderError
            }

        });
    }

    clear() {
        super.clear();
        this.previewElement.src = ''
    }
}

const getFileListName = (fileList) => {
    return fileList.map((file) => file.name).join('<br> ')
}

class FileDrop extends Drop {
    constructor(id) {
        super(id);
        this.file = null;
        this.addFileDrop();
    }

    addFileDrop() {
        this.element.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation()
            const fileList = e.dataTransfer.files;
            this.file = fileList[0]


            this.element.innerHTML = `
            
            Файлы загруженны в память нажмите кнопку что бы спрятать их в картинку
            
            название файла: <div class="fileNames"> <br> ${this.file.name}</div>
            
            `

            console.log('Files:', this.file.path);
        });
    }

    clear() {
        super.clear();
        this.file = null
        this.element.innerHTML = 'Перетащите файл'
    }
}
