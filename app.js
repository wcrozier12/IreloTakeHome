(function () {
  const ireloURL = 'https://valet.irelo.com/api/widget/auto/coop-embed';
  const body = document.body;
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = "http://code.jquery.com/jquery-2.2.1.min.js";
  script.onreadystatechange = handler;
  script.onload = handler;
  head.appendChild(script);

  const companyData = [{
      companyName: 'ACE Relocation',
      img: 'https://www.irelo.com/images/clients/ace.png',
      id: 1
    },
    {
      companyName: 'SIRVA',
      img: 'https://www.irelo.com/images/clients/sirva.png',
      id: 2
    },
    {
      companyName: 'North American Moving Services',
      img: 'https://www.irelo.com/images/clients/north-american.png',
      id: 3
    }
  ]

  function handler() {
    const widgetContainer = $('<div>');
    widgetContainer.css({
      'text-align': 'center'
    })

    const createCompanyContainers = () => {
      companyData.forEach((company) => {
        const div = $('<div>');
        div.css({
          'border': '1px solid black',
          'width': '30%',
          'height': '25vh',
          'margin': 'auto'
        })
        div.attr('id', company.id);
        widgetContainer.append(div);
      })
      $('body').append(widgetContainer);
    }
    const createScreens = () => {
      //Initial Screen
      companyData.forEach((company) => {
        const div = $('<div>');
        const header = $('<h2>');
        header.html(company.companyName);
        const img = $('<img>');
        img.attr('src', company.img);
        img.css({
          'width': '83%'
        })
        const button = $('<button>');
        button.html('Get Quote!')
        button.attr('class', 'quoteButton')
        div.append(header);
        div.append(img);
        div.append(button);
        $('#' + company.id).append(div)
      })
      //Input contact info screen
      companyData.forEach((company) => {
        const formDiv = $('<div>');
        formDiv.attr('id', company.id + 'form')
        const inputHeader = $('<h5>');
        inputHeader.html('Enter your phone number or email for a quote!')
        const input = $('<input>');
        input.attr('id', company.id + 'input');
        const button = $('<button>');
        button.html('Submit')
        button.attr('class', 'submit')
        const errorMsg = $('<p>');
        errorMsg.attr('id', 'error' + company.id)
        formDiv.append(inputHeader);
        formDiv.append(input)
        formDiv.append(button);
        formDiv.append(errorMsg)
        $('#' + company.id).append(formDiv)
        $('#' + company.id + 'form').hide();
      })
      //thanks screen
      companyData.forEach((company) => {
        const thanksDiv = $('<div>');
        thanksDiv.attr('id', company.id + 'thanks')
        const thanksHead = $('<h1>');
        thanksHead.html('Thank you!');
        const thanksMsg = $('<p>');
        thanksMsg.html('You will receive your quote shortly.')
        thanksDiv.append(thanksHead);
        thanksDiv.append(thanksMsg);
        $('#' + company.id).append(thanksDiv)
        $('#' + company.id + 'thanks').hide();
      })

    }
    //create main divs with screens
    createCompanyContainers();
    createScreens();

    //on get quote press'
    $('.quoteButton').click(function () {
      $(this).parent().hide();
      $('#' + $(this).parent().parent().attr('id') + 'form').show()
    })

    //on submit contact info press
    $('.submit').click(function () {
      const contactInfo = $(this).siblings('input').val().trim()
      $(this).siblings('input').val('');

      $.ajax({
          url: 'https://valet.irelo.com/api/widget/auto/coop-embed',
          method: "POST",
          headers: {
            Authorization: '4d69e62f60ab-c-crozier'
          },
          data: {
            verify: contactInfo,
          }
        })
        .done((response) => {
          if (response.success === 0) {
            return $(this).siblings('p').html(response.message)
          }
          $(this).siblings('p').html('')
          $(this).parent().hide();
          $('#' + $(this).parent().parent().attr('id') + 'thanks').show()

        });
    })

  }

})()