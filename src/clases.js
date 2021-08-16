
class Punto {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    // determina si tres puntos estan en sentido antihorario
    static ccw (a, b, c) {
        return (c.y-a.y)*(b.x-a.x) > (b.y-a.y)*(c.x-a.x);
    }

    // determina si los segmentos ab y cd se intersectan
    static intersect (a, b, c, d) {
        return this.ccw(a,c,d) !== this.ccw(b,c,d) && this.ccw(a,b,c) !== this.ccw(a,b,d);
    }
}

export class TSP {
    // Procesa dos listas de puntos
    constructor (x, y) {
        var n = x.length;
        console.assert(x.length === y.length, "Error: x.length != y.length");

        // almacena las coordenadas de cada punto
        var p = Array(n);
        for (var i = 0; i < n; i++) {
            p[i] = new Punto(x[i], y[i]);
        }

        // calcula la matriz de distancias
        var dist = Array(n);
        for (let i = 0; i < n; i++) {
            dist[i] = Array(n);
            for (var j = 0; j < n; j++) {
                dist[i][j] = Math.sqrt((p[i].x - p[j].x) ** 2 + (p[i].y - p[j].y) ** 2);
            }
        }

        this.n = n;
        this.puntos = p;
        this.distancias = dist;
    }

    avaro () {
        var n = this.n;
        var dist = this.distancias;

        // comienza en el nodo 0
        var ruta = Array(n);
        ruta[0] = 0;
        var last = 0;

        // nodos sin visitar
        var unv = Array(n-1);
        for (let i = 1; i < n; i++) {
            unv[i - 1] = i;
        }

        // por cada nodo restante
        for (let i = 1; i < n; i++) {
            // halla el nodo mas cercano
            var min = 0;
            for (var j = 1; j < unv.length; j++) {
                if (dist[last][unv[j]] < dist[last][unv[min]]) {
                    min = j;
                }
            }

            // agrega el nodo a la ruta
            ruta[i] = unv[min];
            unv.splice(min, 1);
        }
        this.ruta = ruta;
    }

    optimizar_n (veces) {
        var n = this.n;
        var r = this.ruta;
        var p = this.puntos;

        // repite la optimización n veces
        for (var i = 0; i < veces; i++) {

            // por cada par de aristas en la ruta
            for (var a = 0; a < n - 2; a++) {
                var b = a + 1;
                for (var c = b + 1; c < n; c++) {
                    var d = c + 1;

                    // si se intersectan reconecta las aristas
                    if (Punto.intersect(p[r[a]], p[r[b]], p[r[c]], p[r[d % n]])) {
                        r = r.slice(0, b).concat(r.slice(b, d).reverse()).concat(r.slice(d));
                    }
                }
            }
        }
        
        this.ruta = r;
    }

    optimizar_profundo () {
        var n = this.n;
        var r = this.ruta;
        var p = this.puntos;

        // repite hasta que no sea posible optimizar la ruta
        var repetir;
        do {
            repetir = false;

            // por cada par de aristas en la ruta
            for (var a = 0; a < n - 2; a++) {
                var b = a + 1;
                for (var c = b + 1; c < n; c++) {
                    var d = c + 1;

                    // si se intersectan reconecta las aristas
                    if (Punto.intersect(p[r[a]], p[r[b]], p[r[c]], p[r[d % n]])) {
                        r = r.slice(0, b).concat(r.slice(b, d).reverse()).concat(r.slice(d));
                        repetir = true;
                    }
                }
            }
        } while (repetir);
        
        this.ruta = r;
    }

    backtracking () {
        // ruta actual
        this.actual = Array(this.n);

        // nodos visitados
        this.visitados = Array(this.n).fill(false);

        // longitud de la ruta
        this.longitud = Infinity;

        // comienza con el primer nodo
        this.backtrack(0, 0);

        delete this.actual;
        delete this.visitados;
        delete this.longitud;

    }

    backtrack (nodoActual, nodosVisitados) {
        // visita el nodo actual
        this.actual[nodosVisitados] = nodoActual;
        this.visitados[nodoActual] = true;
        if (nodosVisitados+1 === this.n) {
            // evalua la ruta actual
            var longitud_actual = this.evaluarRuta(this.actual);
            if (longitud_actual < this.longitud) {
                this.ruta = this.actual.slice();
                this.longitud = longitud_actual;

            }
        } else {
            // visita los otros nodos
            for (var i = 0; i < this.n; i++) {
                if (!this.visitados[i]) {
                    this.backtrack(i, nodosVisitados+1);
                }
            }
        }

        // desvisita el nodo actual
        this.visitados[nodoActual] = false;
    }
	
	lasvegas () {
        // ruta actual
        this.actual = Array(this.n);

        // nodos visitados
        this.visitados = Array(this.n).fill(false);

        // longitud de la ruta
        this.longitud = Infinity;

        // comienza con un nodo aleatorio
        this.algolasvegas(Math.floor(Math.random() * this.n), 0);

        delete this.actual;
        delete this.visitados;
        delete this.longitud;

    }
	
	algolasvegas (nodoActual, nodosVisitados) {
        var i = Math.floor(Math.random() * this.n);
		
		this.actual[nodosVisitados] = nodoActual;
        this.visitados[nodoActual] = true;
		
		// recorrido escogiendo nodos aleatorios
		while (nodosVisitados + 1 !== this.n){
		
			if (!this.visitados[i]) {
				nodosVisitados = nodosVisitados + 1;
				
				this.actual[nodosVisitados] = i;
				this.visitados[i] = true;
			}
		
			i = Math.floor(Math.random() * this.n)
		}
		
        // evalua la ruta actual
        var longitud_actual = this.evaluarRuta(this.actual);
		this.ruta = this.actual.slice();
        this.longitud = longitud_actual;
    }

    evaluarRuta (actual) {
        var longitud = 0;
        for (var i = 1; i < this.n; i++) {
            longitud = longitud + this.distancias[actual[i-1]][actual[i]];
        }
        longitud = longitud + this.distancias[actual[0]][actual[this.n-1]];
        return longitud;
    }
}