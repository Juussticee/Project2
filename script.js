    let selectedFiles = [];
    let projectIdCounter = 0;
            var bellButton=document.querySelector('.bell-icon');
                    function toggleBell(){
                        if(bellButton.classList.contains('clicked')){
                            bellButton.classList.remove('clicked');
                            bellButton.style.backgroundImage="url(bell/bell.png)";
                        } else {
                            bellButton.classList.add('clicked');
                            bellButton.style.backgroundImage="url(bell/bell-off.png)";
                        }
                    }
                    function toggleLike(button){
                        button.classList.toggle('clicked');
                        button.classList.toggle('not-clicked');
                    }
                    function toggleSee(button){
                        if(button.classList.contains('clicked')){
                        } else {
                            button.classList.add('clicked');
                        }
                    }
                    function openModal(){
                        document.getElementById('myModal').style.display='block';
                    }
                    function openDModal(modalId){
                        document.getElementById(modalId).style.display='block';
                    }
                    function openAnnouceModal(){
                        document.getElementById('announceModal').style.display='block';
                    }  
                    function closeAnnounceModal(){
                        document.getElementById('announceModal').style.display='none';
                        document.getElementById('projectForm2').reset();
                    }
                    function closeModal(){
                        document.getElementById('myModal').style.display='none';
                        document.getElementById('projectForm').reset();
                    }
                    function closeDModal(modalId){
                        document.getElementById(modalId).style.display='none';
                    }
                    function previewImages() {
                        const container = document.getElementById('imagesContainer');
                        container.innerHTML = '';
                        const files = document.getElementById('imageAttachment').files;
                    
                        if (files.length > 4) {
                            alert('Please select up to 4 images.');
                            return;
                        }
                        else{
                            for (let i = 0; i < files.length; i++) {
                                const file = files[i];
                                const reader = new FileReader();
                        
                                reader.onload = function(e) {
                                    const img = document.createElement('img');
                                    img.src = e.target.result;
                                    img.style.width = '100px';
                                    img.style.height = '100px';
                                    img.style.margin = '5px';
                                    container.appendChild(img);
                                };
                        
                                reader.readAsDataURL(file);
                            }
                        }
                        
                    }
                    function addProject(){
                        var title= document.getElementById('title').value;
                        var shortDesc=document.getElementById('shortDesc').value;
                        var longDesc=document.getElementById('longDesc').value;
                        var attachment=document.getElementById('attachment');
                        var handle = document.getElementById('handle').textContent;
                        var pic =document.getElementById('userpng').src;
                        var newBox=document.createElement('div');
                        var imagesContainer = document.getElementById('imagesContainer');
                        var images = imagesContainer.innerHTML;
                        newBox.className='box';
                        newBox.dataset.title = title;
                        newBox.dataset.shortDesc = shortDesc;
                        newBox.dataset.longDesc = longDesc;
                        newBox.dataset.attachments = attachment;
                        newBox.dataset.images = images;
                        newBox.dataset.modalId=`dmodal-${projectIdCounter}`;
                        newBox.innerHTML=`
                            <h3>${title}</h3>
                            <p>${shortDesc}</p>
                            <div class="button-group">
                            <button type="button" class="button-box delete-btn"></button>
                            <button type="button" class="button-box see-btn" data-modal-id="dmodal-${projectIdCounter}" ></button>
                            <button type="button" class="button-box like-btn not-clicked"></button>
                            </div>
                        `;
                        document.getElementById('projects').appendChild(newBox);
                        const newModal = document.createElement('div'); 
                        newModal.id=`modal-${projectIdCounter}`;
                        newModal.className = 'modal-content DetailsModal';
                        newModal.innerHTML = `
                        <div class=" FDE">
                            <span class="close" onclick="closeDModal('dmodal-${projectIdCounter}')"></span>
                        </div>
                        <div class="DModalElContainer">
                            <div class="DModalEl" id="item1">
                                <p>${longDesc}</p>
                            </div>
                            <div class="DModalEl attachments" style="display: block;" id="item3">
                                <p>${Array.from(attachment.files).map(file => `<a href="${URL.createObjectURL(file)}" download="${file.name}">${file.name}</a>`).join('<br>')}</p>
                            </div>
                            <div class="ProjectPics">
                                <div id="item2" class="DModalPics">
                                    ${images}
                                </div>
                            </div>
                        </div>
                    `;
                    const PDM=document.createElement('div');
                    PDM.id=`dmodal-${projectIdCounter}`;
                    PDM.className='projectDetailsModal modal';
                    PDM.appendChild(newModal);

                    document.body.appendChild(PDM);

                    var newPost = document.createElement('div');
                    newPost.className = 'trend';
                    newPost.id=`${projectIdCounter}`;
                    newPost.dataset.tId=`${projectIdCounter}`;
                    newPost.innerHTML = `
                        <div class="section-t1">
                            <img src="${pic}" class="trending-pic"></img>
                            </div>
                        <div class="section-t2">
                            <p>${handle}</p>
                            <h4>${title}</h4>
                        </div>
                        `;
                    var tr=document.getElementById('trending-posts');
                    tr.appendChild(newPost);
                        tr.insertBefore(newPost, tr.firstChild);
                         if (tr.children.length> 4) {
                            tr.removeChild(tr.lastChild);
                        }
                    var deleteButton = newBox.querySelector('.delete-btn');
                        deleteButton.addEventListener('click', function() {
                            newBox.remove();
                            newPost.remove();
                            console.log('Box deleted.');
                                });
                    projectIdCounter+=1;
                    document.getElementById('projectForm').reset();
                    closeModal();
                    }
                    function addAnnouncement(){
                        var atitle=document.getElementById('atitle').value;
                        var adesc=document.getElementById('adesc').value;
                        var newAnn=document.createElement('div');
                        var newCon=document.createElement('div');
                        newCon.className='announce-container'; 
                        newAnn.className='announce';
                        newAnn.innerHTML=`
                        <h3>${atitle}</h3>
                        <p>${adesc}</p>
                        `;
                        var newLine=document.createElement('div');
                        newLine.className='line';   
                        newCon.appendChild(newAnn);
                        newCon.appendChild(newLine);
                        document.getElementById('annoucments-posts').appendChild(newCon);
                        var ann=document.getElementById('annoucments-posts');
                        ann.insertBefore(newCon, ann.firstChild);
                         if (ann.children.length> 3) {
                            ann.removeChild(ann.lastChild);
                        }
                        

                        document.getElementById('projectForm2').reset();
                        closeAnnounceModal();
                    }
                    document.getElementById('projects').addEventListener('click', function (event) {
                        if (event.target.classList.contains('like-btn')) {
                            toggleLike(event.target);
                        } else if (event.target.classList.contains('see-btn')) {
                            const ID=event.target.dataset.modalId;
                            console.log(`Trying to open modal with ID: ${ID}`);
                            setTimeout(()=>{
                            openDModal(ID);
                            toggleSee(event.target);
                        },100);
                        }
                    });
                    document.getElementById('trending-section').addEventListener('click' , function(event){
                        const trendingPost = event.target.closest('.trend');
                        if (trendingPost) {
                            const tId = trendingPost.dataset.tId; // Get the tId from the dataset
                            const mId = `dmodal-${tId}`; // Construct the modal ID
                            console.log(`Trying to open trending modal with ID: ${mId}`);
                            setTimeout(() => {
                                openDModal(mId); // Open the modal
                            }, 100);
                               }
                            });