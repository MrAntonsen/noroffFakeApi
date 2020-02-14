$(document).ready(function() {
  const Userid = sessionStorage.getItem("userId");
  let liItem;
  let details = {};
  let postItem;
  $.ajax({
    type: "get",
    url: `https://my-json-server.typicode.com/MrAntonsen/jqDb/users/${Userid}`,
    headers: {
      "Content-Type": "application/json"
    },

    success: function(response) {
      liItem = `<div class="row">
          <div class="col-md-8 offset-2 text-center">
              <h1 class="mb-5">${response.userName}</h1>
          </div>
          </div>
          <div class="row">
          <div class="col-sm-2"><span>User Id:</span>  ${response.id}</div>
          <div class="col-sm-4"><span>Username:</span>  ${response.userName}</div>
          <div class="col-sm-3"><span>Gender:</span>  ${response.userGender}</div>
          <div class="col-sm-3"><span>Age:</span>  ${response.userAge}</div>
          </div>`;
    }
  });

  $.ajax({
    type: "get",
    url: `https://my-json-server.typicode.com/MrAntonsen/jqDb/posts/${Userid}`,
    headers: {
      "Content-Type": "application/json"
    },
    success: function(response) {
      details.userId = response.userId;
      details.id = response.id;
      details.title = response.title;
      details.body = response.body;
      console.log(details);
      postItem = PostItem(details);
      let postoutput = `<div class="row">
      <div class="col-sm-6 offset-3">
        <div class="card">
        <div class="card-body text-center">
        <div class="card-title"><h3>${postItem.getTitle()}<h3></div>
            ${postItem.getBody()}
          </div>
        </div>
      </div>
    </div>`;
      $(".post-container").append(postoutput);
    }
  });

  getUserInfo = () => {
    $("#exampleModal1").modal("show");
    setTimeout(() => {
      $("#exampleModal1").modal("hide");
    }, 4000);
    $("#exampleModal").modal("hide");
    setTimeout(() => {
      $("#exampleModal").html(
        `
          <div class="modal-dialog user-modal modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-center" id="exampleModalLabel">Post title</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body user-modal-body">
                
              </div>
            </div>
          </div>
        `
      );
      $(".user-modal-body").append(liItem);
      $("#exampleModal").modal("toggle");
    }, 4000);
  };
});

let PostItem = item => {
  this.userId = item.userId;
  this.id = item.id;
  this.title = item.title;
  this.body = item.body;

  return {
    getTitle: () => {
      return this.title;
    },
    getBody: () => {
      return this.body;
    },
    getId: () => {
      return this.id;
    }
  };
};
