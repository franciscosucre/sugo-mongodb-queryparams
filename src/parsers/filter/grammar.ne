EXPRESSION -> EXPRESSION _ CONNECTOR _ EXPRESSION {% function(d) { return { [d[2]] : [d[0], d[4]] } } %}
	| "(" _:? EXPRESSION _:? ")" {% function(d) {return d[2]} %}
	| KEY SEPARATOR OPERATOR SEPARATOR VALUE {% function(d) { 
	const [key, separator1, operator, separator2, value] = d
	return { [key]: { [operator] : value }}
} %}
	| KEY {% function(d) {return {$text:{$search: d[0] }}} %}

CONNECTOR -> "OR" {% function() { return "$or" } %}
	| "AND" {% function() { return "$and" } %}

OPERATOR -> "eq" {% function() { return "$eq" } %}
	| "neq" {% function() { return "$ne" } %}
    | "gte" {% function() { return "$gte" } %}
    | "lte" {% function() { return "$lte" } %}
    | "gt" {% function() { return "$gt" } %}
    | "lt" {% function() { return "$lt" } %}

KEY -> [0-9a-zA-Z_$.]:+ {% function(d) {return d[0].join("")} %}

VALUE -> DATETIME {% function(d) { return d[0] } %}
	| NUMERIC {% function(d) { return d[0] } %}
	| BOOLEAN {% function(d) { return d[0] } %}
	| QUOTE .:+ QUOTE {% function(d) { return d[1].join("") } %}
	| STRING {% function(d) { 
		if (d[0] === "true") return true
		if (d[0] === "false") return false
		return d[0] 
} 
%}

DATETIME -> DATE "T" TIME "Z" {% function(d) { return new Date(d.join("")) } %}
	| DATE "T" TIME {% function(d) { return new Date(d.join("")) } %}
	| DATE {% function(d) { return new Date(d.join("")) } %}

TIME -> HOURS ":" MINUTES ":" SECONDS {% function(d) { return d.join("") } %}

DATE -> YEAR "-" MONTH "-" DAY {% function(d) { return d.join("") } %}
	
YEAR -> [1-9] [0-9] [0-9] [0-9] {% function(d) { return d.join("") } %}

MONTH -> "1" [0-2] {% function(d) { return d.join("") } %}
	| "0" [1-9] {% function(d) { return d.join("") } %}
	| [1-9] {% function(d) { return d.join("") } %}

DAY -> "3" [0-1] {% function(d) { return d.join("") } %}
	| "0" [1-9] {% function(d) { return d.join("") } %}
	| [1-2] [0-9] {% function(d) { return d.join("") } %}
	| [1-9] {% function(d) { return d.join("") } %}

HOURS -> "2" [0-3] {% function(d) { return d.join("") } %}
	| [0-1] [0-9] {% function(d) { return d.join("") } %}
	| [0-9] {% function(d) { return d.join("") } %}

MINUTES -> [0-5] [0-9] {% function(d) { return d.join("") } %}
	| [0-9] {% function(d) { return d.join("") } %}

SECONDS -> [0-5] [0-9]  {% function(d) { return d.join("") } %}
	| [0-5] [0-9] "." MILLISECONDS  {% function(d) { return d.join("") } %}
	| [0-9] "." MILLISECONDS {% function(d) { return d.join("") } %}
	| [0-9] {% function(d) { return d.join("") } %}
	
MILLISECONDS -> [0-9] [0-9] [0-9] {% function(d) { return d.join("") } %}
	| [0-9] [0-9] {% function(d) { return d.join("") } %}
	| [0-9] {% function(d) { return d.join("") } %}


NUMERIC -> NUMBER DECIMAL_SEPARATOR NUMBER {% function(d) { return parseFloat(d.join("").replace(/,/g,".")) } %}
	| NUMBER {% function(d) { return parseInt(d) } %}
	
NUMBER -> [0-9]:+ {% function(d) { return d.join('').replace(/,/g,"") } %}

DECIMAL_SEPARATOR -> "." 
	| ","

STRING -> [a-zA-Z@.\-:_]:+ {% function(d) { return d[0].join("") } %}

BOOLEAN -> TRUE {% function(d) { return true } %}
	| FALSE {% function(d) { return false } %}

TRUE -> "true" 

FALSE -> "false"

QUOTE -> "'"
	| "\""

_ -> " ":+

SEPARATOR -> ":"
