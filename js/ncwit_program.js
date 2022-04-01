import mustache from "./mustache.js"



const img_template = `
                        <div class="innerwinner">
                            <div class="row">
                                <div class="col-md-8 col-md-offset-2">
                                    <img class="img-circle img-responsive center-block" src="affiliate_data/winner_images/{{src}}">
                                </div>
                            </div>
				        	<h4>{{name}}</h4>
				        	<h4>{{school}}</h4>
				        	<h4>{{city}}</h4>
				        	<h4>Class of {{classyear}}</h4>
				        	<p>{{bio}}</p>
                        </div>
`; 


function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}





function makeAgenda(body_selector) {
   d3.csv("affiliate_data/agenda.csv", parseAgendaRow).then((data) => makeAgendaFromCSV(data, body_selector));
}

function parseAgendaRow(row) {
    return {
        Time: row.time,
        Event: "<b>" + row.event_title + "</b><br>" +  row.presenter_name + "<br><i>" + row.event_description + "</i>",
        Location: row.location,
    };
}

function makeAgendaFromCSV(data, body_selector) {
    var tbody = d3.select(body_selector)
    
    tbody.selectAll("tr")
        .data(data).enter()
            .append("tr")
            .selectAll("td")
            .data(d => Object.values(d)).enter()
                .append("td")
                .html(d => d);
}




function makeCommittee(body_selector) {
   d3.csv("affiliate_data/committee.csv", parseCommitteeRow).then((data) => makeCommitteeFromCSV(data, body_selector));
}

function parseCommitteeRow(row) {
    return {
        Name: row.name,
    };
}

function makeCommitteeFromCSV(data, body_selector) {
    var tbody = d3.select(body_selector)
    
    tbody.selectAll("tr")
        .data(data).enter()
            .append("tr")
            .selectAll("td")
            .data(d => Object.values(d)).enter()
                .append("td")
                .html(d => d);
}







function makeWinners(container_selector) {
   d3.csv("affiliate_data/winners.csv", parseWinnerRow).then((data) => makeWinnersFromCSV(data, container_selector));
}

function parseWinnerRow(row) {
    return {
        name: row.name,
        school: row.school,
        city: row.city,
        classyear: row.class,
        bio: row.bio,
        src: row.image
    };
}

function makeWinnersFromCSV(data, container_selector) {
    var container = d3.select(container_selector)
    var data_matrix = listToMatrix(data, 3);
   
    container.selectAll("div")
        .data(data_matrix).enter()
        .append("div")
            .attr("class", "row main-content winnerrow")
            .selectAll("div")
            .data(d => d).enter()
            .append("div")
                .attr("class", "col-md-4 col-sm-12 col-xs-12 text-center winner")
                .html(d => mustache.render(img_template, d));
}

export {makeAgenda, makeCommittee, makeWinners};
