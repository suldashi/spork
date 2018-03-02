class EntryStatsHelper {
    getFastest(entries) {
        if(entries.length===0) {
            return "n/a";
        }
        let speeds = entries.map((el) => el.distance/el.duration);
        let sorted = speeds.sort((l,r) => l<r);
        if(sorted.length>0) {
            return (this.toKmh(sorted[0]).toFixed(2))+" km/h";
        }
        else {
            return "n/a";
        }
    }

    getAverage(entries) {
        if(entries.length===0) {
            return "n/a";
        }
        let sum = 0;
        for(var i in entries) {
            sum+=(entries[i].distance/entries[i].duration);
        }
        return (this.toKmh(sum/entries.length).toFixed(2))+" km/h";;
    }

    getGreatest(entries) {
        if(entries.length===0) {
            return "n/a";
        }
        let speeds = entries.map((el) => el.distance);
        let sorted = speeds.sort((l,r) => l<r);
        if(sorted.length>0) {
            return (this.toKm(sorted[0]).toFixed(2))+" km";;
        }
        else {
            return "n/a";
        }
    }

    getTotal(entries) {
        if(entries.length===0) {
            return "n/a";
        }
        let sum = 0;
        for(var i in entries) {
            sum+=(entries[i].distance);
        }
        return (this.toKm(sum).toFixed(2))+" km";;
    }

    toKm(meters) {
        return meters/1000;
    }

    toMins(seconds) {
        return seconds/60;
    }

    toKmh(mps) {
        return mps*3.6;
    }

    calcSpeed(distance,duration) {
        return (distance/duration).toFixed(2);
    }
}

module.exports = new EntryStatsHelper();